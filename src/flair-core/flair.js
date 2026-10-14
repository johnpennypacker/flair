( function() {

	var links;

	document.addEventListener('DOMContentLoaded', initFlair);

	function initFlair() {
		/** add css classnames to cardish structures **/
		initCardish();

		/** add hover x and y coordinates to links and buttons **/
		links = document.querySelectorAll('a, button, .button');
		links.forEach(function(el) {
			el.addEventListener( 'mousemove', buttonFlair );
		});

		/**
		 * Scroll position data, for anything that opts in with .flair-io
		 * (fixie, metric, sidler). Entrance animations have their own
		 * observer; see initEntrances().
		 */
		if('IntersectionObserver' in window){
			let observer = new IntersectionObserver( observerCallback, { threshold: buildThreshold( 100 ) } );
			document.querySelectorAll( '.flair-io' ).forEach( function( el ) {
				observer.observe( el );
			} );
		}

		initEntrances();

		// setInterval(changeRando, 1000);

	}

	/**
	 * Entrance animations.
	 *
	 * Anything carrying data-flair-animate="<preset>" is held back until it
	 * scrolls into view, then plays @keyframes flair-entrance-<preset>.
	 * Whatever is already on screen when the page loads is left as it is.
	 * entrance.php writes the attribute for blocks that chose one; the site's
	 * defaults (window.flairAnimation) fill in the rest here. "none" opts an
	 * element, and everything inside it, out of the defaults.
	 */
	function initEntrances() {
		if ( ! ( 'IntersectionObserver' in window ) ) {
			return;
		}
		var config = window.flairAnimation || {};
		var selectors = ( config.selectors || [] ).join( ',' );

		if ( selectors && config.preset ) {
			var matches;
			try {
				matches = document.querySelectorAll( selectors );
			} catch ( e ) {
				// One bad selector from a theme's filter shouldn't take the rest down.
				matches = [];
				console.warn( 'flair: bad flair_animation_defaults selector', e );
			}
			matches.forEach( function( el ) {
				// The element's own choice wins, and so does a "none" around it.
				if ( ! el.hasAttribute( 'data-flair-animate' ) && ! el.closest( '[data-flair-animate="none"]' ) ) {
					el.setAttribute( 'data-flair-animate', config.preset );
				}
			} );
		}

		var els = document.querySelectorAll( '[data-flair-animate]:not([data-flair-animate="none"])' );
		if ( ! els.length ) {
			return;
		}

		// A preset can follow the scroll instead of playing once: its CSS sets
		// --flair-entrance-scroll: 1 (wipe does). That needs scroll-driven
		// animation support, and isn't for anyone who'd rather not have motion;
		// either way it falls back to playing once like the rest.
		var scrollSync = window.CSS && CSS.supports( 'animation-timeline: view()' ) &&
			! window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;
		var scrolled = [];

		// Read everything before writing anything, so this costs one layout
		// rather than one per element.
		var vw = window.innerWidth;
		var vh = window.innerHeight;
		var plans = Array.prototype.map.call( els, function( el ) {
			var rect = el.getBoundingClientRect();
			return {
				el: el,
				// Content already on screen is left alone: hiding it now would
				// make it blink out and back, and hold back what the visitor is
				// already looking at. Any overlap counts. A display:none element
				// (an inactive tab, say) measures 0x0 and isn't on screen.
				onScreen: rect.bottom > 0 && rect.right > 0 && rect.top < vh && rect.left < vw && ( rect.width > 0 || rect.height > 0 ),
				scroll: scrollSync && getComputedStyle( el ).getPropertyValue( '--flair-entrance-scroll' ).trim() === '1',
			};
		} );

		var observer = new IntersectionObserver( revealEntrances, { threshold: 0 } );
		plans.forEach( function( plan ) {
			var el = plan.el;
			if ( plan.onScreen ) {
				el.removeAttribute( 'data-flair-animate' );
				return;
			}
			el.style.setProperty( '--flair-entrance', 'flair-entrance-' + el.getAttribute( 'data-flair-animate' ) );
			if ( plan.scroll ) {
				scrolled.push( el );
			} else {
				observer.observe( el );
			}
		} );

		// The scroll timeline holds these at their start until they arrive, so
		// they are "revealed" from the outset. Only items side by side in a row
		// are staggered; anything further down already starts later.
		revealBatches( scrolled, true );

		// Only now is it safe to hide anything: if this script never runs,
		// nothing is held back.
		document.documentElement.classList.add( 'flair-js' );
	}

	/**
	 * Reveal what came into view.
	 */
	function revealEntrances( entries, observer ) {
		var arrived = [];
		entries.forEach( function( entry ) {
			if ( entry.isIntersecting ) {
				observer.unobserve( entry.target );
				arrived.push( entry.target );
			}
		} );
		revealBatches( arrived, false );
	}

	/**
	 * Reveal elements, staggering siblings that arrive together.
	 *
	 * The stagger index counts within one batch of arrivals that share a
	 * parent, so a tall stack doesn't make its twelfth item wait out eleven
	 * delays when it's scrolled to on its own. It also starts over at each
	 * visual row: an item that wrapped back toward the inline start begins a
	 * new row, so a grid ripples across each row in turn instead of counting
	 * down the whole grid. A vertical stack never wraps, so it counts straight
	 * down -- unless `scroll` is set, where only items sharing a row count,
	 * since each one lower down already starts later on its own. Siblings are
	 * found through rowItem(), so an image alone in each column still counts
	 * across the row of columns.
	 */
	function revealBatches( elements, scroll ) {
		var batches = new Map();
		elements.forEach( function( el ) {
			var item = rowItem( el );
			var parent = item.parentNode;
			if ( ! batches.has( parent ) ) {
				batches.set( parent, [] );
			}
			batches.get( parent ).push( { el: el, item: item } );
		} );
		batches.forEach( function( batch ) {
			batch.sort( function( a, b ) {
				return a.item.compareDocumentPosition( b.item ) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
			} );
			var rtl = getComputedStyle( batch[ 0 ].item.parentNode ).direction === 'rtl';
			// Measure everything before revealing anything: once revealed, the
			// animation's starting offset would skew the next measurement.
			var rects = batch.map( function( entry ) {
				return entry.item.getBoundingClientRect();
			} );
			var starts = rects.map( function( rect ) {
				return rtl ? -rect.right : rect.left;
			} );
			var index = 0;
			batch.forEach( function( entry, i ) {
				var el = entry.el;
				if ( i > 0 ) {
					var wrapped = starts[ i ] < starts[ i - 1 ] - 1;
					var below = Math.abs( rects[ i ].top - rects[ i - 1 ].top ) > 1;
					index = wrapped || ( scroll && below ) ? 0 : index + 1;
				}
				el.style.setProperty( '--flair-stagger-index', index );
				if ( scroll ) {
					el.setAttribute( 'data-flair-scroll', '' );
				}
				el.setAttribute( 'data-flair-revealed', '' );
			} );
		} );
	}

	/**
	 * What an animated element counts as when staggering.
	 *
	 * An image alone in a column should take its place in the row of columns,
	 * not sit in a row of one. So climb from the element while the wrapper
	 * around it holds nothing else that animates; the topmost such wrapper is
	 * the item, and its siblings are the row.
	 */
	function rowItem( el ) {
		var item = el;
		var parent = item.parentElement;
		while ( parent && parent !== document.body &&
			parent.querySelectorAll( '[data-flair-animate]:not([data-flair-animate="none"])' ).length === 1 ) {
			item = parent;
			parent = item.parentElement;
		}
		return item;
	}

	function initCardish() {
		let cardishes = document.querySelectorAll('.cardish');
		cardishes.forEach(function(c) {
			let h = c.querySelectorAll('h2:has(a), h3:has(a), h4:has(a), h5:has(a)');
			if( h[0] ) {
				h[0].classList.add('cardish-title');
			}
		});
	}


	function buttonFlair(e) {
		e.target.style.setProperty( '--mouse-x', e.offsetX );
		e.target.style.setProperty( '--mouse-y', e.offsetY );

		e.target.style.setProperty( '--mouse-x-pct', e.offsetX / e.target.offsetWidth );
		e.target.style.setProperty( '--mouse-y-pct', e.offsetY / e.target.offsetHeight );

	}

	/**
	 * Seeds random numbers to css vars
	 */
	function changeRando() {
		document.querySelector(':root').style.setProperty('--random', Math.random());
		document.querySelector(':root').style.setProperty('--random2', Math.random());
	}


	/**
	 * Publishes, on each observed element:
	 * - data-intersection: outside, bottom (coming in), inside, or top (going out)
	 * - data-is-intersecting: "true" or "false"
	 * - --intersection-ratio: how much of it is on screen; for anything taller
	 *   than the viewport, how much of the viewport it fills
	 */
	function observerCallback(entries, observer) {
		// Read once, before any writes, so the loop never forces a layout.
		var vh = window.innerHeight;

		entries.forEach(function(entry) {
			var el = entry.target;
			var ratio = entry.intersectionRatio;
			var output;

			if ( ratio === 0 ) {
				output = 'outside';
			} else if ( ratio < .99 ) {
				// Cut off at the top edge means it's leaving upward. The half
				// pixel absorbs sub-pixel layout, which otherwise reads an
				// element coming in from below as leaving through the top.
				output = entry.intersectionRect.top - entry.boundingClientRect.top > 0.5 ? 'top' : 'bottom';
			} else {
				output = 'inside';
			}

			// Write only what changed. Every write is a mutation record for
			// anyone watching (metric is), and most steps change only the ratio.
			if ( el.dataset.intersection !== output ) {
				el.dataset.intersection = output;
			}
			if ( el.dataset.isIntersecting !== String( entry.isIntersecting ) ) {
				el.dataset.isIntersecting = entry.isIntersecting;
			}
			el.style.setProperty( '--intersection-ratio', entry.boundingClientRect.height > vh ? entry.intersectionRect.height / vh : ratio );
		});
	}


	function buildThreshold(num) {
		let thresholds = [];

		for (let i=1.0; i<=num; i++) {
			let ratio = i/num;
			thresholds.push(ratio);
		}

		thresholds.push(0);
		return thresholds;
	}

})();


/**
 * Whole-block linking for card and overlay.
 *
 * Both blocks stretch their heading anchor over the block in CSS, which is
 * what gives the status bar URL, cmd/middle-click, the context menu and
 * keyboard access -- all handled by the browser. That overlay sits *below* the
 * prose so the prose stays selectable, which leaves one gap: a click landing
 * on the text itself never reaches the anchor. This closes it.
 *
 * Replaces the per-block card.js/overlay.js, which timed mousedown against
 * mouseup and fired link.click() under 200ms -- that swallowed modifier keys
 * and made a drag-to-select read as a click.
 */
( function () {

	const BLOCKS = '.flair-card, .flair-overlay';
	// Things that handle their own clicks and must be left alone.
	const INTERACTIVE = 'a, button, input, select, textarea, label, summary, [role="button"], [role="link"]';

	function linkFor( target ) {
		const block = target.closest ? target.closest( BLOCKS ) : null;
		if ( ! block ) {
			return null;
		}
		// The anchor's own clicks are already real clicks -- acting again here
		// would navigate twice.
		if ( target.closest( INTERACTIVE ) ) {
			return null;
		}
		// A drag that selected text is not a click on the card.
		const selection = window.getSelection();
		if ( selection && selection.toString().trim() ) {
			return null;
		}
		return block.querySelector( '.title a[href]' );
	}

	// A double-click to select a word begins with an ordinary single click,
	// and at that moment nothing is selected yet -- so navigating immediately
	// would take the page away mid-gesture. Clicks that land on the prose wait
	// out the double-click interval first. Only the prose reaches this code:
	// everywhere else on the block the stretched anchor is the hit target and
	// the browser navigates with no delay at all.
	const DOUBLE_CLICK_GRACE = 250;
	let pending = null;

	document.addEventListener( 'click', function ( event ) {
		const link = linkFor( event.target );
		if ( ! link ) {
			return;
		}
		// The second and subsequent clicks of a multi-click are never a
		// request to navigate.
		if ( event.detail > 1 ) {
			clearTimeout( pending );
			return;
		}
		// Honour the modifiers the browser would have honoured on the anchor.
		// These are unambiguous, so they go through straight away.
		if ( event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ) {
			window.open( link.href, '_blank', 'noopener' );
			return;
		}
		clearTimeout( pending );
		pending = setTimeout( function () {
			// Re-check: the grace period is long enough for a word to have
			// been selected by a second click.
			const selection = window.getSelection();
			if ( selection && selection.toString().trim() ) {
				return;
			}
			link.click();
		}, DOUBLE_CLICK_GRACE );
	} );

	document.addEventListener( 'dblclick', function ( event ) {
		if ( linkFor( event.target ) !== null || event.target.closest( BLOCKS ) ) {
			clearTimeout( pending );
		}
	} );

	// Middle-click arrives as auxclick, not click.
	document.addEventListener( 'auxclick', function ( event ) {
		if ( event.button !== 1 ) {
			return;
		}
		const link = linkFor( event.target );
		if ( link ) {
			window.open( link.href, '_blank', 'noopener' );
		}
	} );

} )();
