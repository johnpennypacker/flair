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
	console.error( 'usage: node diff.mjs <before-label> <after-label> [--prop <name>] [--page <id>] [--ignore-class <name>] [--size-only] [--quiet]' );
	process.exit( 1 );
}

const flag = ( name ) => {
	const i = flags.indexOf( `--${ name }` );
	return i === -1 ? null : flags[ i + 1 ];
};
const onlyProp = flag( 'prop' );
const onlyPage = flag( 'page' );
const quiet = flags.includes( '--quiet' );
const sizeOnly = flags.includes( '--size-only' );

// Element keys carry the class list, so removing a class renames the element
// and everything under it — the diff fills with paired appeared/disappeared
// noise. Normalising the class out makes the two runs comparable.
//   --ignore-class is-layout-constrained
const ignoredClasses = flags.reduce( ( acc, f, i ) => {
	return f === '--ignore-class' ? [ ...acc, flags[ i + 1 ] ] : acc;
}, [] );

const normaliseKey = ( key ) =>
	ignoredClasses.reduce(
		( k, cls ) => k.split( '.' + cls ).join( '' ),
		key
	);

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
		} else if ( k === '_box' ) {
			// One spacing change shifts every element below it down the page,
			// so raw box deltas are dominated by flow. Size is the element's
			// own geometry and is the signal; position is mostly downstream.
			const [ x, y, w, h ] = v.split( ' ' );
			out._size = `${ w }x${ h }`;
			out._pos = `${ x },${ y }`;
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
		const remap = ( data ) =>
			Object.fromEntries(
				Object.entries( data ).map( ( [ k, v ] ) => [ normaliseKey( k ), v ] )
			);
		const da = remap( ra.data );
		const db = remap( rb.data );

		for ( const key of new Set( [ ...Object.keys( da ), ...Object.keys( db ) ] ) ) {
			const ea = da[ key ];
			const eb = db[ key ];

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
				if ( sizeOnly && ( p === '_pos' || p.endsWith( ' _pos' ) ) ) {
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
