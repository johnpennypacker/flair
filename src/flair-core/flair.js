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
			let els = document.querySelectorAll(".wp-block-cover, figure, header, footer, nav, section, .flair-io, .wp-block-column");

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
		const x = e.pageX - e.target.offsetX;
		const y = e.pageY - e.target.offsetY;
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
				targetElement.style.setProperty( '--intersection-ratio', 1 - (top/vh) );
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
