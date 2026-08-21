/**
 * Compare two probe runs.
 *
 *   node tools/theming-probe/diff.mjs baseline after-step-1
 *   node tools/theming-probe/diff.mjs baseline after-step-1 --prop margin-bottom
 *   node tools/theming-probe/diff.mjs baseline after-step-1 --page cb-academics.desktop
 *
 * Exit code is 1 when anything changed, so it can gate a commit.
 */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname( fileURLToPath( import.meta.url ) );
const [ aLabel, bLabel, ...flags ] = process.argv.slice( 2 );

if ( ! aLabel || ! bLabel ) {
	console.error( 'usage: node diff.mjs <before-label> <after-label> [--prop <name>] [--page <id>] [--quiet]' );
	process.exit( 1 );
}

const flag = ( name ) => {
	const i = flags.indexOf( `--${ name }` );
	return i === -1 ? null : flags[ i + 1 ];
};
const onlyProp = flag( 'prop' );
const onlyPage = flag( 'page' );
const quiet = flags.includes( '--quiet' );

const load = ( label ) =>
	JSON.parse( readFileSync( join( HERE, 'runs', label, 'probe.json' ), 'utf8' ) );

const a = load( aLabel );
const b = load( bLabel );

if ( JSON.stringify( a.props ) !== JSON.stringify( b.props ) ) {
	console.error( 'Property list changed between runs — recapture both sides.' );
	process.exit( 2 );
}

// Flatten an element entry (plus its pseudos) to prop -> value.
const flatten = ( entry ) => {
	const out = {};
	for ( const [ k, v ] of Object.entries( entry ) ) {
		if ( k === '::before' || k === '::after' ) {
			for ( const [ pk, pv ] of Object.entries( v ) ) {
				out[ `${ k } ${ pk }` ] = pv;
			}
		} else {
			out[ k ] = v;
		}
	}
	return out;
};

let changed = 0;
let appeared = 0;
let vanished = 0;
const propTally = {};

for ( const pageId of new Set( [ ...Object.keys( a.results ), ...Object.keys( b.results ) ] ) ) {
	if ( onlyPage && pageId !== onlyPage ) {
		continue;
	}

	const ra = a.results[ pageId ];
	const rb = b.results[ pageId ];
	const lines = [];

	if ( ! ra || ! rb ) {
		lines.push( `  page present in only one run` );
	} else if ( ra.error || rb.error ) {
		lines.push( `  error: ${ ra.error || '' } ${ rb.error || '' }`.trim() );
	} else {
		for ( const key of new Set( [ ...Object.keys( ra.data ), ...Object.keys( rb.data ) ] ) ) {
			const ea = ra.data[ key ];
			const eb = rb.data[ key ];

			if ( ! ea ) {
				appeared++;
				lines.push( `  + ${ key }` );
				continue;
			}
			if ( ! eb ) {
				vanished++;
				lines.push( `  - ${ key }` );
				continue;
			}

			const fa = flatten( ea );
			const fb = flatten( eb );
			const props = [ ...new Set( [ ...Object.keys( fa ), ...Object.keys( fb ) ] ) ].sort();
			const deltas = [];

			for ( const p of props ) {
				if ( onlyProp && ! p.includes( onlyProp ) ) {
					continue;
				}
				if ( fa[ p ] !== fb[ p ] ) {
					deltas.push( `      ${ p }: ${ fa[ p ] ?? '—' }  →  ${ fb[ p ] ?? '—' }` );
					propTally[ p ] = ( propTally[ p ] || 0 ) + 1;
				}
			}

			if ( deltas.length ) {
				changed++;
				lines.push( `  ~ ${ key }` );
				lines.push( ...deltas );
			}
		}
	}

	if ( lines.length && ! quiet ) {
		console.log( `\n${ pageId }  (${ ( ra || rb ).url })` );
		console.log( lines.join( '\n' ) );
	}
}

const totalDeltas = Object.values( propTally ).reduce( ( x, y ) => x + y, 0 );

console.log( `\n${ '='.repeat( 60 ) }` );
console.log( `${ aLabel } → ${ bLabel }` );
console.log( `${ changed } elements changed, ${ appeared } appeared, ${ vanished } disappeared` );

if ( totalDeltas ) {
	console.log( `\nby property:` );
	for ( const [ p, n ] of Object.entries( propTally ).sort( ( x, y ) => y[ 1 ] - x[ 1 ] ) ) {
		console.log( `  ${ String( n ).padStart( 5 ) }  ${ p }` );
	}
}

process.exit( changed + appeared + vanished ? 1 : 0 );
