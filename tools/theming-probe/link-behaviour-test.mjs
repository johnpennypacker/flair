/**
 * Whole-block linking behaviour for card and overlay.
 *
 * These two blocks are the same component in different clothes, and their
 * linking has to stay in step. The behaviour is a three-way trade -- a point
 * on screen hit-tests to exactly one element, so a surface cannot both report
 * a link URL and be selectable text. Flair resolves it by layering: the
 * stretched anchor covers the block *beneath* the prose, and a delegated
 * handler picks up the clicks that land on prose.
 *
 * That is easy to break silently, so it is checked rather than assumed.
 *
 *   node tools/theming-probe/link-behaviour-test.mjs
 *
 * Exits non-zero if any block fails any check.
 */

import { chromium } from 'playwright';

const CASES = [
	{ name: 'card', url: 'http://localhost:10030/academics/', block: '.flair-card', prose: '.flair-card .excerpt' },
	{ name: 'overlay', url: 'http://localhost:10030/about/leadership/', block: '.flair-overlay', prose: '.flair-overlay .misc' },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
let failures = 0;

const check = ( label, ok, detail = '' ) => {
	if ( ! ok ) failures++;
	console.log( `    ${ ok ? 'ok  ' : 'FAIL' }  ${ label.padEnd( 34 ) }${ detail }` );
};

// Box of the first real text node inside `sel` -- guessing coordinates from
// the element box lands between lines and reads as a false failure.
//
// Scrolling and measuring are deliberately separate calls: these pages animate
// content into view, so a rect measured in the same tick as the scroll is
// stale by the time the mouse gets there, and the pointer lands on whatever
// has moved under it.
async function textBox( sel ) {
	await page.evaluate( ( s ) => {
		const host = document.querySelector( s );
		if ( host ) host.scrollIntoView( { block: 'center', behavior: 'instant' } );
	}, sel );
	await page.waitForTimeout( 400 );
	return page.evaluate( ( s ) => {
		const host = document.querySelector( s );
		if ( ! host ) return null;
		const walker = document.createTreeWalker( host, NodeFilter.SHOW_TEXT );
		let n;
		while ( ( n = walker.nextNode() ) ) {
			if ( n.textContent.trim().length > 8 ) {
				const r = document.createRange();
				r.selectNodeContents( n );
				// One line, not the bounding box. A text node broken over two
				// lines (a <br>, or just wrapping) has a bounding box whose
				// middle falls in the gap between them, where there is no word
				// to hit.
				const line = [ ...r.getClientRects() ].find( ( b ) => b.width > 20 && b.height > 4 );
				if ( line ) {
					return { x: line.x, y: line.y, w: line.width, h: line.height };
				}
			}
		}
		return null;
	}, sel );
}

async function fresh( url ) {
	await page.goto( url, { waitUntil: 'networkidle' } );
	await page.addStyleTag( { content: '*,*::before,*::after{transition-duration:0s!important;animation-duration:0s!important}' } );
}

for ( const c of CASES ) {
	console.log( `\n  ${ c.name }  (${ c.url })` );

	// 1. prose is selectable by dragging
	await fresh( c.url );
	let tb = await textBox( c.prose );
	if ( ! tb ) {
		console.log( `    skip  no prose text found on this page` );
	} else {
		await page.waitForTimeout( 200 );
		const y = tb.y + tb.h / 2;
		await page.mouse.move( tb.x + 2, y );
		await page.mouse.down();
		for ( const f of [ 0.3, 0.6, 0.95 ] ) {
			await page.mouse.move( tb.x + tb.w * f, y );
			await page.waitForTimeout( 30 );
		}
		await page.mouse.up();
		await page.waitForTimeout( 250 );
		const navigated = page.url() !== c.url;
		const sel = navigated ? '' : await page.evaluate( () => window.getSelection().toString().trim() );
		check( 'drag selects prose', !! sel, sel ? JSON.stringify( sel.slice( 0, 28 ) ) : navigated ? 'navigated instead' : 'nothing selected' );

		// 2. double-click selects a word rather than navigating.
		// Sampled across the line: a single fraction can land in the space
		// between two words, where double-clicking rightly selects nothing.
		await fresh( c.url );
		tb = await textBox( c.prose );
		await page.waitForTimeout( 200 );
		let word = '';
		let navd = false;
		for ( const frac of [ 0.2, 0.5, 0.75 ] ) {
			await page.mouse.dblclick( tb.x + tb.w * frac, tb.y + tb.h / 2 );
			await page.waitForTimeout( 400 );
			navd = page.url() !== c.url;
			if ( navd ) break;
			word = await page.evaluate( () => window.getSelection().toString().trim() );
			if ( word ) break;
			await page.evaluate( () => window.getSelection().removeAllRanges() );
		}
		check( 'double-click selects a word', !! word && ! navd, navd ? 'navigated instead' : JSON.stringify( word ) );

		// 3. a plain click on prose still follows the link
		await fresh( c.url );
		tb = await textBox( c.prose );
		await page.waitForTimeout( 200 );
		await page.mouse.click( tb.x + tb.w * 0.3, tb.y + tb.h / 2 );
		await page.waitForTimeout( 1200 );
		check( 'click on prose navigates', page.url() !== c.url );
	}

	// 4. the anchor itself covers the non-prose surface (status bar, context menu)
	await fresh( c.url );
	const blk = page.locator( c.block ).first();
	await blk.scrollIntoViewIfNeeded();
	await page.waitForTimeout( 250 );
	const cover = await page.evaluate( ( bs ) => {
		const block = document.querySelector( bs );
		const link = block.querySelector( '.title a' );
		const r = block.getBoundingClientRect();
		let hit = 0, total = 0;
		for ( let fy = 0.05; fy < 1; fy += 0.05 ) {
			for ( let fx = 0.05; fx < 1; fx += 0.1 ) {
				const el = document.elementFromPoint( r.x + r.width * fx, r.y + r.height * fy );
				if ( ! el ) continue;
				total++;
				if ( el === link || link.contains( el ) || el.closest( '.title a' ) ) hit++;
			}
		}
		return Math.round( ( hit / total ) * 100 );
	}, c.block );
	check( 'anchor covers the block', cover > 40, `${ cover }% of the surface reports the link URL` );

	// 5. clicking away from the prose navigates natively
	await fresh( c.url );
	await blk.scrollIntoViewIfNeeded();
	await page.waitForTimeout( 250 );
	let b = await blk.boundingBox();
	await page.mouse.click( b.x + b.width * 0.5, b.y + b.height * 0.93 );
	await page.waitForTimeout( 1200 );
	check( 'click off the prose navigates', page.url() !== c.url );

	// 6. modifier click opens a new tab instead of navigating in place
	await fresh( c.url );
	await blk.scrollIntoViewIfNeeded();
	await page.waitForTimeout( 250 );
	b = await blk.boundingBox();
	const tabs = ctx.pages().length;
	await page.keyboard.down( 'Meta' );
	await page.mouse.click( b.x + b.width * 0.5, b.y + b.height * 0.93 );
	await page.keyboard.up( 'Meta' );
	await page.waitForTimeout( 1500 );
	check( 'cmd-click opens a new tab', ctx.pages().length - tabs > 0 );
	for ( const p of ctx.pages().slice( 1 ) ) await p.close();

	// 7. the heading is still a real link, reachable by keyboard
	await fresh( c.url );
	const kb = await page.evaluate( ( bs ) => {
		const link = document.querySelector( bs + ' .title a' );
		return { isAnchor: !! link && link.tagName === 'A', hasHref: !! link?.getAttribute( 'href' ) };
	}, c.block );
	check( 'heading is a real link', kb.isAnchor && kb.hasHref );
}

await browser.close();
console.log( `\n  ${ failures } failed` );
process.exit( failures ? 1 : 0 );
