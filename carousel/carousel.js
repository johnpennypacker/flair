/**
 * 
 */
( function() {

	var carousels;
	
	document.addEventListener( "DOMContentLoaded", initCarousel );
	
	function initCarousel() {

		carousels = document.querySelectorAll( ".carousel" );
				
		carousels.forEach( function( el ) {
			observe( el );
			var w = wrapCarousel( el );
			// w.dataset.slideDist = getSlideDistance( w );
			addPrevNextButtons( w );
			addDots( w );
			updateButtons( w );
						
		});
		
	}
	
	function getSlideDistance( el ) {
		var cols = el.querySelectorAll( ".carousel > div" );
		var cols = [...cols];

		var rect = cols[0].getBoundingClientRect();
		var rect2 = cols[1].getBoundingClientRect();

		return (rect2.width - ( rect.width + rect.left )) * -1;

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
			var els = el.querySelectorAll(":scope > .wp-block-column");
			
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
			var els = carousel.querySelectorAll(".wp-block-column");			
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
		var xer = (el.dataset.xer * 1);
		// sanity check
		var index = el.dataset.slideIndex;
		if ( index < 0 ) {
			index = 0;
			el.dataset.slideIndex = index;
		}
		var max = ( el.dataset.slideCount * 1 ) + 1 - xer;
		if ( index > max ) {
			index = max;
			el.dataset.slideIndex = index;
		}
		// end sanity check

		var c = el.querySelector( ".carousel" );
		var rect = el.getBoundingClientRect();
		var dist = rect.width / (el.dataset.xer * 1);
		c.scrollLeft = dist * index;


// 		c.scrollLeft = Math.floor( el.dataset.slideDist * index );

		// updateButtons( el ); // IntersectionObserver handles this
	}
	
	function updateButtons( el ) {
		var dots = el.querySelectorAll( ".dot" );
		dots.forEach( function( d ) {
			if( d.dataset.slideIndex == el.dataset.slideIndex ) {
				d.dataset.isSelected = 1;
			} else {
				d.dataset.isSelected = 0;
			}
		});
		
		var p = el.querySelector(".previous");
		var n = el.querySelector(".next");
		p.classList.remove('disabled');
		n.classList.remove('disabled');
		if( 0 == el.dataset.slideIndex ) {
			p.classList.add('disabled');
		}
		if( el.dataset.slideCount == el.dataset.slideIndex ) {
			n.classList.add('disabled');
		}
		
	}
	
	
	function wrapCarousel( el ) {
		var wrap = document.createElement("DIV");
		wrap.classList.add("carousel-wrap");
		el.parentNode.insertBefore( wrap, el );		
		wrap.appendChild( el );
		
		var slides = el.querySelectorAll(":scope > div");		
		wrap.dataset.slideCount = slides.length;
		wrap.dataset.slideIndex = 0;
		
		wrap.dataset.xer = 1;
		var rect = wrap.getBoundingClientRect();
		
		if( rect.width > 400 && el.classList.contains( "double" ) ) {
			wrap.dataset.xer = 2;
		}

		if( el.classList.contains( "triple" ) ) {
			if ( rect.width > 640 ) {
				wrap.dataset.xer = 3;
			} else {
				el.classList.remove( "triple" );
				el.classList.add( "double" );
				wrap.dataset.xer = 2;
			}
		}

		return wrap;
	}

	
	function addDots( el ) {
		var dot, c, dots, slides, i;
		
		c = el.querySelector( ".carousel" );
		
		dots = document.createElement("DIV");
		dots.classList.add("dots");
		el.appendChild(dots);
		el.classList.add("has-dots");
				
		for( i=0; i<el.dataset.slideCount; i++ ) {
			(function(i){
				dot = document.createElement("BUTTON");
				dot.classList.add("dot");
				dot.dataset.slideIndex = i;
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
		var c = el.querySelector( ".carousel" );
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

		el.classList.add("has-buttons");

	}
	


})();