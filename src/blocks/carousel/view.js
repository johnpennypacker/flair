
/**
 *
 */
( function() {

	var carousels;

	document.addEventListener( "DOMContentLoaded", initCarousel );

	function initWrapper( el ) {
		var wrap = el.closest(".flair-carousel-wrapper");

		var slides = el.querySelectorAll(":scope > div");
		wrap.dataset.slideCount = slides.length;
		wrap.dataset.slideIndex = 0;

		wrap.dataset.xer = 1;
		var rect = wrap.getBoundingClientRect();

		if( rect.width > 400 && wrap.classList.contains( "double" ) ) {
			wrap.dataset.xer = 2;
		}

		// this is a pretty kludgy way to manage breakpoints
		if( wrap.classList.contains( "triple" ) ) {
			if ( rect.width > 640 ) {
				wrap.dataset.xer = 3;
			} else {
				wrap.classList.remove( "triple" );
				wrap.classList.add( "double" );
				wrap.dataset.xer = 2;
			}
		}

		return wrap;
	}

	function calculateStops(el) {
		var slides = el.querySelectorAll( ".flair-carousel-slide" );
		var stops = [];

		var sx = el.getBoundingClientRect().x;

		slides.forEach( function( sl ) {
			let stop = sl.getBoundingClientRect().x - sx;
			stops.push( stop );
		});
		el.dataset.stops = stops;
	}


	function initCarousel() {

		carousels = document.querySelectorAll( ".flair-carousel" );

		carousels.forEach( function( el ) {
			observe( el );
			calculateStops( el );

			var w = initWrapper(el);

			if( w.classList.contains("has-arrows") ) {
				addPrevNextButtons( w );
			}
			if( w.classList.contains("has-dots") ) {
				addDots( w );
			}
			updateButtons( w );

		});

	}

	function observe( el ) {
		var rect = el.getBoundingClientRect();

		//** add intersection data to images and major sections **/
		if ('IntersectionObserver' in window) {
			var options = {
				root: el,
				rootMargin: '0px',
				threshold: [0, 0.2, 0.6, 0.8, 1]
// 				threshold: buildThreshold( ( rect.width / 60 ) )
			}
			var observer = new IntersectionObserver(observerCallback, options);
			var els = el.querySelectorAll(":scope > .flair-carousel-slide");

			els.forEach(function( el ) {
				observer.observe(el);
			});
		}
	}

	function observerCallback(entries, observer) {
		entries.every(function(entry) {
			entry.target.dataset.intersection = entry.intersectionRatio;
			entry.target.dataset.isIntersecting = entry.isIntersecting;
			if( entry.intersectionRatio > .6 ) {
				var c = entry.target.parentNode;
				var wrap = c.parentNode;
				var index = Array.prototype.indexOf.call( c.children, entry.target );

				// this is where the dots are getting messed up on doubles and triples...
				// we need this to "auto-detect" the slide position when the user scrolls
				// but it misbehaves when a the user clicks a dot/button
				// the "fix" is the callbackCallBack function that limits execution
				// to just the last iteration.
				// it mostly works
				// wrap.dataset.slideIndex = index;
	 			// updateButtons( wrap );
				return false;
			}
			return true;
		});
		callbackCallBack(entries[0].target.parentNode);
	}

	function callbackCallBack( carousel ) {
			var els = carousel.querySelectorAll(".flair-carousel-slide");
			els = [...els];
			els.every(function( el ) {
				if( el.dataset.intersection > .6 && el.dataset.isIntersecting ) {

					var wrap = carousel.parentNode;
					var index = Array.prototype.indexOf.call( carousel.children, el );
					wrap.dataset.slideIndex = index;

					updateButtons( wrap );
					return false;
				}
				return true;
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


	function updatePosition( el ) {
		// sanity check
		if ( el.dataset.slideIndex < 0 ) {
			el.dataset.slideIndex = 0;
		}
		var max = ( el.dataset.slideCount * 1 ) - 1;
		if ( el.dataset.slideIndex > max ) {
			el.dataset.slideIndex = max;
		}
		// end sanity check

		var c = el.querySelector( ".flair-carousel" );
		var stops = c.dataset.stops.split(",");

		c.scrollLeft = stops[el.dataset.slideIndex];


	}



	function updateButtons( el ) {

		if( el.classList.contains("has-dots") ) {
			var dots = el.querySelectorAll( ".dot" );
			dots.forEach( function( d ) {
				if( d.dataset.slideIndex == el.dataset.slideIndex ) {
					d.dataset.isSelected = 1;
				} else {
					d.dataset.isSelected = 0;
				}
			});
		}

		if( el.classList.contains("has-arrows") ) {
			var p = el.querySelector(".previous");
			var n = el.querySelector(".next");
			p.classList.remove('disabled');
			n.classList.remove('disabled');

			if( 0 == el.dataset.slideIndex ) {
				p.classList.add('disabled');
			}
			if( (el.dataset.slideCount - 1) == el.dataset.slideIndex ) {
				n.classList.add('disabled');
			}
		}

	}




	function addDots( el ) {
		var xer, dot, c, dots, slides, i;

		xer = (el.dataset.xer * 1);

		c = el.querySelector( ".flair-carousel" );

		dots = document.createElement("DIV");
		dots.classList.add("dots");
		el.appendChild(dots);
		el.classList.add("has-dots");

		for( i=0; i<Math.ceil(el.dataset.slideCount / xer); i++ ) {
			(function(i){
				dot = document.createElement("BUTTON");
				dot.classList.add("dot");
				dot.dataset.slideIndex = i * xer;
				dot.addEventListener( "click", function() {
					el.dataset.slideIndex = i;
					updatePosition( el );
				});
				dots.appendChild(dot);
			})(i)
		}

	}


	function addPrevNextButtons( el ) {
		var f, r;
		var c = el.querySelector( ".flair-carousel" );
		var xer = (el.dataset.xer * 1);
		r = document.createElement("BUTTON");
		r.innerHTML = "Previous";
		r.classList.add("previous");
		r.addEventListener( "click", function() {
			el.dataset.slideIndex = (el.dataset.slideIndex*1) - xer;
			updatePosition( el );
		});
		el.appendChild(r);

		f = document.createElement("BUTTON");
		f.innerHTML = "Next";
		f.classList.add("next");
		f.addEventListener( "click", function() {
			el.dataset.slideIndex = (el.dataset.slideIndex*1) + xer;
			updatePosition( el );
		});
		el.appendChild(f);

	}



})();
