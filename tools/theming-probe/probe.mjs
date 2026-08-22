/**
 * Theming-friction regression probe.
 *
 * Every fix in THEMING-FRICTION.md is a cascade change, and Flair has two
 * live consumers with opposite postures (see urls.txt). Screenshots alone
 * make you eyeball 44 images per run; this records the computed values the
 * findings actually touch, so a diff is exact and instant. Screenshots are
 * still captured alongside, as the check for anything the property list
 * misses.
 *
 *   node tools/theming-probe/probe.mjs baseline
 *   node tools/theming-probe/probe.mjs after-step-1
 *   node tools/theming-probe/diff.mjs baseline after-step-1
 *
 * Runs land in tools/theming-probe/runs/<label>/ (gitignored).
 */

import { chromium } from 'playwright';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname( fileURLToPath( import.meta.url ) );

const VIEWPORTS = [
	{ name: 'desktop', width: 1280, height: 900 },
	{ name: 'mobile', width: 390, height: 844 },
];

/**
 * Properties recorded per element. Deliberately narrow: this is the union of
 * what the ten findings touch plus enough context to notice collateral
 * damage. Adding a property invalidates existing baselines — recapture both
 * sides rather than diffing across a change to this list.
 */
const PROPS = [
	// #1 — core's .is-layout-constrained answer is max-width + auto margins.
	'max-width', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
	// #2 — the card footer's negative margin, and what it is fighting.
	'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
	// #3 — a specificity shift shows up as any of these changing hands.
	'display', 'position', 'width', 'height', 'flex-direction', 'order',
	'align-items', 'justify-content', 'gap', 'z-index', 'overflow',
	'color', 'background-color', 'opacity', 'visibility',
	'border-top-width', 'border-right-width', 'border-bottom-width',
	'border-left-width', 'border-radius',
	// #4 — the card's structural ::before.
	'content', 'top', 'right', 'bottom', 'left', 'box-shadow', 'transform',
	// #5 — the multibutton toggle's three coupled constraints.
	'aspect-ratio', 'mask-size', 'mask-image', '-webkit-mask-size',
	// #9 — transition: all. Durations are zeroed for stability; the property
	// list is what this finding is about and stays readable.
	'transition-property',
	// #10 — the ad-hoc visually-hidden technique.
	'clip-path',
];

/** Runs in the page. Keep self-contained — it is serialised across. */
function collect( props ) {
	const norm = ( v ) => ( v == null ? '' : String( v ).replace( /\s+/g, ' ' ).trim() );

	const sig = ( el ) => {
		const cls = [ ...el.classList ].sort().join( '.' );
		return el.tagName.toLowerCase() + ( cls ? '.' + cls : '' );
	};

	// Stable, content-derived key: the chain of tag.classes from the flair
	// root down, with a sibling ordinal only where it is needed to
	// disambiguate. Index-based alone would be brittle; this survives
	// unrelated markup moving around it.
	const keyFor = ( root, rootIdx, el ) => {
		const parts = [];
		let node = el;
		while ( node && node !== root ) {
			const same = [ ...node.parentElement.children ].filter(
				( s ) => sig( s ) === sig( node )
			);
			const ord = same.length > 1 ? `[${ same.indexOf( node ) }]` : '';
			parts.unshift( sig( node ) + ord );
			node = node.parentElement;
		}
		return `${ sig( root ) }#${ rootIdx }${ parts.length ? ' > ' + parts.join( ' > ' ) : '' }`;
	};

	const read = ( el, pseudo ) => {
		const cs = getComputedStyle( el, pseudo || undefined );
		const out = {};
		for ( const p of props ) {
			const v = norm( cs.getPropertyValue( p ) );
			if ( v && v !== 'none' && v !== 'auto' && v !== 'normal' ) {
				out[ p ] = v;
			}
		}
		if ( ! pseudo ) {
			const r = el.getBoundingClientRect();
			out._box = [ r.x, r.y, r.width, r.height ].map( ( n ) => Math.round( n * 10 ) / 10 ).join( ' ' );
		}
		return out;
	};

	const roots = [ ...document.querySelectorAll( '[class*="flair-"], [class*="wp-block-flair-"]' ) ]
		// Only outermost flair elements are roots; the rest arrive as descendants.
		.filter( ( el ) => ! el.parentElement.closest( '[class*="flair-"], [class*="wp-block-flair-"]' ) );

	const data = {};
	let truncated = false;

	roots.forEach( ( root, rootIdx ) => {
		const els = [ root, ...root.querySelectorAll( '*' ) ];
		if ( els.length > 300 ) {
			truncated = true;
		}
		for ( const el of els.slice( 0, 300 ) ) {
			const key = keyFor( root, rootIdx, el );
			const entry = read( el );
			for ( const pseudo of [ '::before', '::after' ] ) {
				const p = read( el, pseudo );
				// getComputedStyle always answers for a pseudo; only a
				// generated `content` means one actually exists.
				if ( p.content ) {
					entry[ pseudo ] = p;
				}
			}
			data[ key ] = entry;
		}
	} );

	return { rootCount: roots.length, elementCount: Object.keys( data ).length, truncated, data };
}

const label = process.argv[ 2 ];
if ( ! label || ! /^[\w.-]+$/.test( label ) ) {
	console.error( 'usage: node probe.mjs <run-label>' );
	process.exit( 1 );
}

const targets = readFileSync( join( HERE, 'urls.txt' ), 'utf8' )
	.split( '\n' )
	.filter( ( l ) => l.trim() && ! l.startsWith( '#' ) )
	.map( ( l ) => {
		const [ name, url ] = l.split( '\t' );
		return { name: name.trim(), url: url.trim() };
	} );

const runDir = join( HERE, 'runs', label );
mkdirSync( join( runDir, 'shots' ), { recursive: true } );

const browser = await chromium.launch();
const results = {};
let failures = 0;

for ( const vp of VIEWPORTS ) {
	const context = await browser.newContext( {
		viewport: { width: vp.width, height: vp.height },
		deviceScaleFactor: 1,
		// Entrance animations (fadie/kinetic) otherwise leave elements caught
		// mid-flight and the geometry never settles. Durations and delays are
		// zeroed so the final state is what gets measured; transition-property
		// stays readable, which is the part finding #9 is about.
		reducedMotion: 'reduce',
	} );
	await context.addInitScript( () => {
		const css = `*, *::before, *::after {
			animation-duration: 0s !important;
			animation-delay: 0s !important;
			transition-duration: 0s !important;
			transition-delay: 0s !important;
			caret-color: transparent !important;
		}`;
		const apply = () => {
			const s = document.createElement( 'style' );
			s.textContent = css;
			document.head.appendChild( s );
		};
		if ( document.head ) {
			apply();
		} else {
			document.addEventListener( 'DOMContentLoaded', apply );
		}
	} );

	const page = await context.newPage();

	for ( const t of targets ) {
		const id = `${ t.name }.${ vp.name }`;
		try {
			const response = await page.goto( t.url, { waitUntil: 'networkidle', timeout: 30000 } );
			// A stopped site answers 502 with an error page, which has no
			// flair markup in it -- without this check that records as "0
			// elements" and the diff reports it as everything disappearing,
			// which reads far too much like a real regression.
			if ( response && ! response.ok() ) {
				throw new Error( `HTTP ${ response.status() } -- is the site running?` );
			}
			// Scroll the full height once: scroll-triggered reveals (kinetic,
			// fadie) never fire otherwise, and half the page measures hidden.
			await page.evaluate( async () => {
				const step = window.innerHeight;
				for ( let y = 0; y < document.body.scrollHeight; y += step ) {
					window.scrollTo( 0, y );
					await new Promise( ( r ) => requestAnimationFrame( r ) );
				}
				window.scrollTo( 0, 0 );
				await new Promise( ( r ) => requestAnimationFrame( r ) );
			} );
			// The metric block counts up over 800ms of rAF once it intersects,
			// so a fixed settle lands mid-flight and the digit widths wobble.
			// Wait for every counter to reach the value it started from.
			await page.waitForFunction( () => {
				return [ ...document.querySelectorAll( '.metric-count' ) ].every(
					( s ) => ! s.dataset.original || s.innerText === s.dataset.original
				);
			}, null, { timeout: 5000 } ).catch( () => {} );
			await page.waitForTimeout( 250 );

			results[ id ] = { url: t.url, ...( await page.evaluate( collect, PROPS ) ) };
			await page.screenshot( { path: join( runDir, 'shots', `${ id }.png` ), fullPage: true } );
			const n = results[ id ].elementCount;
			console.log( `  ${ id.padEnd( 28 ) } ${ String( results[ id ].rootCount ).padStart( 3 ) } roots ${ String( n ).padStart( 4 ) } elements${ results[ id ].truncated ? ' (truncated)' : '' }` );
		} catch ( e ) {
			failures++;
			results[ id ] = { url: t.url, error: e.message };
			console.log( `  ${ id.padEnd( 28 ) } FAILED: ${ e.message.split( '\n' )[ 0 ] }` );
		}
	}

	await context.close();
}

await browser.close();

writeFileSync(
	join( runDir, 'probe.json' ),
	JSON.stringify( { label, capturedAt: new Date().toISOString(), props: PROPS, results }, null, '\t' )
);

const total = Object.values( results ).reduce( ( a, r ) => a + ( r.elementCount || 0 ), 0 );
console.log( `\n${ label }: ${ total } elements across ${ Object.keys( results ).length } page/viewport pairs, ${ failures } failed` );
console.log( `written to tools/theming-probe/runs/${ label }/` );
