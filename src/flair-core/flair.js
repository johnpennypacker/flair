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

		//** add intersection data to images and major sections **/
		if('IntersectionObserver' in window){
			let options = {
				root: null,
				rootMargin: '0px',
				threshold: buildThreshold( 100 )
			}
			let observer = new IntersectionObserver(observerCallback, options);
			let els = document.querySelectorAll(".wp-block-cover, figure, footer, section, .flair-io, .wp-block-column, .flair-overlay-wrapper");

			els.forEach(function(el) {
				observer.observe(el);
				el.dataset.wasVisible = false;
				el.style.setProperty( '--was-visible', 'false' );
			});
		}

		// setInterval(changeRando, 1000);

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


	function observerCallback(entries, observer) {

		entries.forEach(function(entry) {

			var ratio = entry.intersectionRatio;
			var boundingRect = entry.boundingClientRect;
			var intersectionRect = entry.intersectionRect;
			var output;

			var targetElement = entry.target;

			if (ratio === 0) {
				output = 'outside';
			} else if (ratio < .99) {
				if ( boundingRect.top < intersectionRect.top ) {
					output = 'top';
				} else {
					output = 'bottom';
				}
			} else {
				output = 'inside';
			}

			var top = entry.boundingClientRect.top;
			var pct = 0;
			var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
			var height = entry.boundingClientRect.height;

			targetElement.dataset.intersection = output;

			// set the distance from the top of the element to the top of the viewport
			targetElement.style.setProperty( '--from-top', top );
			targetElement.style.setProperty( '--pct-from-top', top/vh );
			targetElement.dataset.isIntersecting = entry.isIntersecting;
			targetElement.style.setProperty( '--intersecting', entry.isIntersecting );
			targetElement.style.setProperty( '--height', height );
			targetElement.style.setProperty( '--vh', vh );
			if( !! entry.isIntersecting ) {
				targetElement.dataset.wasVisible = "true";
				targetElement.style.setProperty( '--was-visible', "true" );
			}

			if( height > vh ) {
				targetElement.style.setProperty( '--intersection-ratio', entry.intersectionRect.height / window.innerHeight );
			} else {
				targetElement.style.setProperty( '--intersection-ratio', entry.intersectionRatio );
			}

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
