
/**
 * Carousel front end.
 *
 * The author picks a slides-per-page setting in the editor and the template
 * renders it as a class ( single / double / triple ). That class is treated as
 * read-only here: what actually fits at the current width is kept separately in
 * `data-xer`, so a narrow measurement can always be undone when the wrapper
 * gets wider again.
 *
 * Positions are tracked by *page*, not by slide. `data-stops` holds one scroll
 * offset per page, which is what the dots and the arrows both step through.
 */
( function() {

	// Minimum wrapper width, in px, needed to show this many slides at once.
	var BREAKPOINTS = { 2: 400, 3: 600 };

	var RESIZE_DELAY = 150;
	var SCROLL_DELAY = 120;

	document.addEventListener( "DOMContentLoaded", initCarousels );

	function initCarousels() {
		document.querySelectorAll( ".flair-carousel-wrapper" ).forEach( initWrapper );
	}

	function initWrapper( wrap ) {
		var carousel = wrap.querySelector( ":scope > .flair-carousel" );
		if( ! carousel ) {
			return;
		}

		wrap.dataset.slideCount = slidesOf( carousel ).length;
		wrap.dataset.pageIndex = 0;
		wrap.dataset.xer = effectiveXer( wrap );

		if( wrap.classList.contains( "has-arrows" ) ) {
			addPrevNextButtons( wrap );
		}

		calculateStops( wrap );
		buildDots( wrap );
		updateButtons( wrap );

		carousel.addEventListener( "scroll", debounce( function() {
			syncPageFromScroll( wrap );
		}, SCROLL_DELAY ), { passive: true } );

		watchSize( wrap );
	}


	/* --- measuring ------------------------------------------------------- */

	function slidesOf( carousel ) {
		return carousel.querySelectorAll( ":scope > .flair-carousel-slide" );
	}

	/**
	 * The setting the author asked for, read off the class the template wrote.
	 */
	function requestedXer( wrap ) {
		if( wrap.classList.contains( "triple" ) ) {
			return 3;
		}
		if( wrap.classList.contains( "double" ) ) {
			return 2;
		}
		return 1;
	}

	/**
	 * The author's setting capped to what fits right now.
	 *
	 * offsetWidth, not getBoundingClientRect(): the rect is scaled by any
	 * transform on this element or an ancestor, so a theme that animates
	 * sections into view on scroll would otherwise make us measure narrow and
	 * downgrade a carousel that has plenty of room.
	 */
	function effectiveXer( wrap ) {
		var xer = requestedXer( wrap );
		var width = wrap.offsetWidth;

		while( xer > 1 && width <= BREAKPOINTS[ xer ] ) {
			xer -= 1;
		}
		return xer;
	}

	/**
	 * How far the carousel must scroll to bring this slide to its left edge.
	 * offsetLeft is used for the same reason as offsetWidth above.
	 */
	function slideOffset( carousel, slide ) {
		if( slide.offsetParent === carousel ) {
			return slide.offsetLeft;
		}
		return slide.offsetLeft - carousel.offsetLeft;
	}

	/**
	 * One stop per page, clamped to how far the carousel can actually scroll.
	 */
	function calculateStops( wrap ) {
		var carousel = wrap.querySelector( ":scope > .flair-carousel" );
		var slides = slidesOf( carousel );
		var xer = ( wrap.dataset.xer * 1 );
		var maxScroll = Math.max( 0, carousel.scrollWidth - carousel.clientWidth );
		var stops = [];
		var i, stop;

		for( i = 0; i < slides.length; i += xer ) {
			stop = Math.min( slideOffset( carousel, slides[ i ] ), maxScroll );

			// Once a page clamps onto the one before it there is nothing new
			// left to scroll to, so it does not get a stop — or a dot.
			if( stops.length && stop - stops[ stops.length - 1 ] < 1 ) {
				break;
			}
			stops.push( stop );
		}

		if( ! stops.length ) {
			stops.push( 0 );
		}

		wrap.dataset.stops = stops;
		return stops;
	}

	function stopsOf( wrap ) {
		return ( wrap.dataset.stops || "0" ).split( "," ).map( Number );
	}


	/* --- position -------------------------------------------------------- */

	function goToPage( wrap, index ) {
		var carousel = wrap.querySelector( ":scope > .flair-carousel" );
		var stops = stopsOf( wrap );

		index = Math.min( Math.max( index, 0 ), stops.length - 1 );

		wrap.dataset.pageIndex = index;
		carousel.scrollLeft = stops[ index ];
		updateButtons( wrap );
	}

	/**
	 * Keep the dots honest when the user scrolls or swipes by hand.
	 *
	 * This replaces the old IntersectionObserver pass, which reported a *slide*
	 * index that no dot matched once a page held two or three of them, and
	 * which fought with clicks on the dots it was meant to be updating. Reading
	 * the settled scroll position answers the same question directly.
	 */
	function syncPageFromScroll( wrap ) {
		var carousel = wrap.querySelector( ":scope > .flair-carousel" );
		var stops = stopsOf( wrap );
		var scrollLeft = carousel.scrollLeft;
		var nearest = 0;
		var i;

		for( i = 1; i < stops.length; i++ ) {
			if( Math.abs( stops[ i ] - scrollLeft ) < Math.abs( stops[ nearest ] - scrollLeft ) ) {
				nearest = i;
			}
		}

		if( ( wrap.dataset.pageIndex * 1 ) !== nearest ) {
			wrap.dataset.pageIndex = nearest;
			updateButtons( wrap );
		}
	}


	/* --- resize ---------------------------------------------------------- */

	function watchSize( wrap ) {
		var relayoutSoon = debounce( function() {
			relayout( wrap );
		}, RESIZE_DELAY );

		if( "ResizeObserver" in window ) {
			// Observing the wrapper also covers the case that started all this:
			// the element was hidden, transformed or otherwise unmeasurable at
			// DOMContentLoaded. The first callback lands once it has a size.
			new ResizeObserver( relayoutSoon ).observe( wrap );
			return;
		}

		window.addEventListener( "resize", relayoutSoon );
	}

	function relayout( wrap ) {
		var xer = effectiveXer( wrap );
		var changed = ( wrap.dataset.xer * 1 ) !== xer;

		if( changed ) {
			wrap.dataset.xer = xer;
		}

		// Stops move on any width change, not just one that changes the count.
		calculateStops( wrap );

		if( changed ) {
			buildDots( wrap );
		}

		// Re-pin the page we were on, clamped in case there are now fewer.
		goToPage( wrap, wrap.dataset.pageIndex * 1 );
	}


	/* --- controls -------------------------------------------------------- */

	function updateButtons( wrap ) {
		var index = ( wrap.dataset.pageIndex * 1 );
		var lastPage = stopsOf( wrap ).length - 1;
		var dots, previous, next;

		if( wrap.classList.contains( "has-dots" ) ) {
			dots = wrap.querySelectorAll( ":scope > .dots > .dot" );
			dots.forEach( function( d ) {
				d.dataset.isSelected = ( ( d.dataset.pageIndex * 1 ) === index ) ? 1 : 0;
			});
		}

		if( wrap.classList.contains( "has-arrows" ) ) {
			previous = wrap.querySelector( ":scope > .previous" );
			next = wrap.querySelector( ":scope > .next" );

			if( previous ) {
				previous.classList.toggle( "disabled", index <= 0 );
			}
			if( next ) {
				next.classList.toggle( "disabled", index >= lastPage );
			}
		}
	}

	/**
	 * Built from the stop count, and rebuilt whenever that changes, so the
	 * number of dots always matches the number of places you can scroll to.
	 */
	function buildDots( wrap ) {
		var pages = stopsOf( wrap ).length;
		var dots = wrap.querySelector( ":scope > .dots" );
		var i;

		if( ! wrap.classList.contains( "has-dots" ) ) {
			return;
		}

		if( ! dots ) {
			dots = document.createElement( "DIV" );
			dots.classList.add( "dots" );
			wrap.appendChild( dots );
		}

		if( dots.childElementCount === pages ) {
			return;
		}

		dots.replaceChildren();

		for( i = 0; i < pages; i++ ) {
			(function( i ) {
				var dot = document.createElement( "BUTTON" );
				dot.type = "button";
				dot.classList.add( "dot" );
				dot.dataset.pageIndex = i;
				dot.addEventListener( "click", function() {
					goToPage( wrap, i );
				});
				dots.appendChild( dot );
			})( i );
		}
	}

	function addPrevNextButtons( wrap ) {
		var previous, next;

		previous = document.createElement( "BUTTON" );
		previous.type = "button";
		previous.innerHTML = '<span class="flair-sr-only">Previous</span>';
		previous.classList.add( "previous" );
		previous.addEventListener( "click", function() {
			// Read the page index at click time — stepping by a count captured
			// when the button was built goes stale on the first resize.
			goToPage( wrap, ( wrap.dataset.pageIndex * 1 ) - 1 );
		});
		wrap.appendChild( previous );

		next = document.createElement( "BUTTON" );
		next.type = "button";
		next.innerHTML = '<span class="flair-sr-only">Next</span>';
		next.classList.add( "next" );
		next.addEventListener( "click", function() {
			goToPage( wrap, ( wrap.dataset.pageIndex * 1 ) + 1 );
		});
		wrap.appendChild( next );
	}


	/* --- utilities ------------------------------------------------------- */

	function debounce( fn, wait ) {
		var timer;
		return function() {
			window.clearTimeout( timer );
			timer = window.setTimeout( fn, wait );
		};
	}

})();
