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
			addPrevNextButtons( w );
			addDots( w );
			updateButtons( w );
		});
		
	}
	
	function observe( el ) {
		var rect = el.getBoundingClientRect();

		//** add intersection data to images and major sections **/
		if ('IntersectionObserver' in window) {
			var options = {
				root: null,
				rootMargin: '0px',
				threshold: buildThreshold( ( rect.width / 2.2 ) )
			}
			var observer = new IntersectionObserver(observerCallback, options);
			var els = el.querySelectorAll(":scope > .wp-block-column");
			
			els.forEach(function( el ) {
				observer.observe(el);
			});
		}
	}
	
	function observerCallback(entries, observer) {
		entries.forEach(function(entry) {
			if( entry.intersectionRatio > .9 ) {
				var c = entry.target.parentNode;
				var wrap = c.parentNode;
				var index = Array.prototype.indexOf.call( c.children, entry.target );
				wrap.dataset.slideIndex = index;
				updateButtons( wrap );
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


	function updatePosition( el, index ) {
		if ( index < 0 ) {
			return false;
		}
		el.dataset.slideIndex = index;
		var c = el.querySelector( ".carousel" );
		var rect = el.getBoundingClientRect();
		c.scrollLeft = rect.width * index;
		//updateButtons( el ); // IntersectionObserver handles this
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
		if( el.dataset.slideCount-1 == el.dataset.slideIndex ) {
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
					updatePosition( el, i );
				});
				dots.appendChild(dot);
			})(i)
		}

	}
	
	
	function addPrevNextButtons( el ) {
		var f, r;
		var c = el.querySelector( ".carousel" );
		
		r = document.createElement("BUTTON");
		r.innerHTML = "Previous";
		r.classList.add("previous");
		r.addEventListener( "click", function() {
			if( el.dataset.slideIndex > 0 )  {
				el.dataset.slideIndex = (el.dataset.slideIndex*1) - 1;
				updatePosition( el, el.dataset.slideIndex );
			}
		});
		el.appendChild(r);

		f = document.createElement("BUTTON");
		f.innerHTML = "Next";
		f.classList.add("next");
		f.addEventListener( "click", function() {
			if( el.dataset.slideIndex < el.dataset.slideCount - 1 )  {
				el.dataset.slideIndex = (el.dataset.slideIndex*1) + 1;
				updatePosition( el, el.dataset.slideIndex );
			}
		});
		el.appendChild(f);

		el.classList.add("has-buttons");

	}
	


})();