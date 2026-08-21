/**
 * "If Flair sets it for looks, one class beats it."
 *
 * THEMING-FRICTION.md #3 asks for a rule a theme author can rely on rather
 * than a coverage percentage. This checks it: for each presentational default,
 * disable the theme's own stylesheets (so the subject is Flair, not whoever
 * happens to override it already), inject the plainest single-class rule a
 * theme would reach for, and see whether it actually lands.
 *
 *   node tools/theming-probe/override-test.mjs
 *
 * Exits non-zero if any default cannot be beaten by one class.
 */

import { chromium } from 'playwright';

const PAGE = 'http://styleguide.local/styleguide/';

// [ label, selector a theme would plausibly write, property, value to force ]
const CASES = [
	[ 'milestone marker', '.flair-milestone .timeline::before', 'background-color', 'rgb(1, 2, 3)' ],
	[ 'milestone marker radius', '.flair-milestone .timeline::before', 'border-radius', '4px' ],
	[ 'milestone rail', '.flair-milestone .timeline', 'background-color', 'rgb(1, 2, 3)' ],
	[ 'milestone gap', '.flair-milestone', 'gap', '7px' ],
	[ 'card text padding', '.flair-card .text', 'padding-top', '7px' ],
	[ 'card shadow layer', '.flair-card::before', 'box-shadow', 'rgb(1, 2, 3) 0px 0px 0px 1px' ],
	[ 'boxout padding', '.flair-boxout', 'padding-top', '7px' ],
	[ 'eyebrow size', '.flair-eyebrow', 'font-size', '7px' ],
	[ 'alert close', '.flair-alert-close', 'background-color', 'rgb(1, 2, 3)' ],
	[ 'carousel wrapper', '.flair-carousel-wrapper', 'background-color', 'rgb(1, 2, 3)' ],
	[ 'tabs list', '.flair-tabs', 'gap', '7px' ],
	[ 'overlay text padding', '.flair-overlay .text', 'padding-top', '7px' ],
	[ 'multibutton toggle', '.flair-multibutton .dropdown-toggle', 'border-inline-start-width', '7px' ],
	[ 'metric number', '.flair-metric em', 'font-size', '7px' ],
];

const browser = await chromium.launch();
const page = await browser.newPage( { viewport: { width: 1280, height: 900 } } );
await page.goto( PAGE, { waitUntil: 'networkidle' } );

// `transition: all` (finding #9) means an injected value is still in flight
// when it is read back, and a won override reads as a lost one. Zero the
// durations so the computed value is the settled one.
await page.addStyleTag( {
	content: `*, *::before, *::after {
		transition-duration: 0s !important;
		transition-delay: 0s !important;
		animation-duration: 0s !important;
	}`,
} );

// Take the theme out of the picture so the subject is Flair's own weight.
const disabled = await page.evaluate( () => {
	let n = 0;
	for ( const sheet of document.styleSheets ) {
		const href = sheet.href || '';
		const id = sheet.ownerNode?.id || '';
		if ( /cosi/i.test( href ) || /cosi/i.test( id ) ) {
			sheet.disabled = true;
			n++;
		}
	}
	return n;
} );

const results = [];
for ( const [ label, selector, prop, value ] of CASES ) {
	const r = await page.evaluate(
		( [ selector, prop, value ] ) => {
			const pseudoMatch = selector.match( /^(.*?)(::(?:before|after))$/ );
			const base = pseudoMatch ? pseudoMatch[ 1 ] : selector;
			const pseudo = pseudoMatch ? pseudoMatch[ 2 ] : undefined;

			const el = document.querySelector( base );
			if ( ! el ) {
				return { status: 'no element' };
			}

			const before = getComputedStyle( el, pseudo ).getPropertyValue( prop );

			const style = document.createElement( 'style' );
			style.textContent = `${ selector } { ${ prop }: ${ value }; }`;
			document.head.appendChild( style );

			const after = getComputedStyle( el, pseudo ).getPropertyValue( prop );
			style.remove();

			return { status: 'ok', before, after };
		},
		[ selector, prop, value ]
	);

	if ( r.status !== 'ok' ) {
		results.push( { label, selector, verdict: 'SKIP', detail: r.status } );
		continue;
	}

	const won = r.after.trim() === value.trim();
	results.push( {
		label,
		selector,
		verdict: won ? 'wins' : 'LOSES',
		detail: won ? `${ r.before } -> ${ r.after }` : `stayed ${ r.after }, wanted ${ value }`,
	} );
}

await browser.close();

let failed = 0;
for ( const r of results ) {
	if ( r.verdict === 'LOSES' ) {
		failed++;
	}
	console.log(
		`  ${ r.verdict.padEnd( 6 ) } ${ r.label.padEnd( 24 ) } ${ r.selector.padEnd( 42 ) } ${ r.detail }`
	);
}
console.log(
	`\n${ results.length } presentational defaults, theme stylesheets disabled (${ disabled }), ${ failed } not beatable by one class`
);
process.exit( failed ? 1 : 0 );
