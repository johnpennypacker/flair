/**
 * Hover lift stability at the bottom edge (THEMING-FRICTION.md #7).
 *
 * Hanging a lift off `.flair-card:hover` moves the very element that owns the
 * hover state. Near the bottom edge the pointer falls outside as the card
 * rises, hover drops, it falls back, and it oscillates under the cursor -- so
 * the bottom few pixels of the block cannot hold a hover at all.
 *
 * A stationary synthetic pointer will not show this: the browser only
 * re-evaluates hover on mouse events, so the state never flips. This walks the
 * pointer up through the edge instead and records where the state changes. If
 * the lift is triggered from the element that moves, hover dies one lift-height
 * early; triggered from the wrapper, it holds to the real boundary.
 *
 *   node tools/theming-probe/hover-edge-test.mjs
 */

import { chromium } from 'playwright';

const LIFT = 2; // px, the translateY in the block stylesheets
const CASES = [
	{ name: 'card', url: 'http://localhost:10030/families/', sel: '.flair-card' },
	{ name: 'overlay', url: 'http://localhost:10030/about/leadership/', sel: '.flair-overlay' },
];

const browser = await chromium.launch();
const page = await browser.newPage( { viewport: { width: 1280, height: 900 } } );
let failures = 0;

for ( const c of CASES ) {
	await page.goto( c.url, { waitUntil: 'networkidle' } );
	await page.addStyleTag( { content: '*,*::before,*::after{transition-duration:0s!important;animation-duration:0s!important}' } );
	const el = page.locator( c.sel ).first();
	await el.scrollIntoViewIfNeeded();
	await page.waitForTimeout( 300 );
	const box = await el.boundingBox();
	const x = box.x + box.width / 2;

	const seen = [];
	for ( let dy = 3; dy >= 0.5; dy -= 0.5 ) {
		await page.mouse.move( x, box.y + box.height - dy );
		await page.waitForTimeout( 80 );
		const t = await page.evaluate( ( s ) => getComputedStyle( document.querySelector( s ) ).transform, c.sel );
		seen.push( { dy, on: t !== 'none' } );
	}

	// The deepest point inside the edge that still holds hover.
	const lost = seen.find( ( s ) => ! s.on );
	const heldTo = lost ? lost.dy + 0.5 : 0.5;
	const ok = heldTo <= LIFT / 2;
	if ( ! ok ) failures++;

	console.log(
		`  ${ ok ? 'ok  ' : 'FAIL' }  ${ c.name.padEnd( 8 ) } hover holds to ${ heldTo }px inside the bottom edge` +
		( ok ? '' : ` -- a ${ heldTo }px dead band; the lift is triggered from the element that moves` )
	);
	console.log( `        ${ seen.map( ( s ) => `${ s.dy }:${ s.on ? 'on' : 'off' }` ).join( '  ' ) }` );
}

await browser.close();
console.log( `\n  ${ failures } failed` );
process.exit( failures ? 1 : 0 );
