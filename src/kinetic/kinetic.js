( function() {

	var kinetics;

	document.addEventListener( "DOMContentLoaded", initKinetic );

	function initKinetic() {

		kinetics = document.querySelectorAll( ".kinetic" );

		var mutationObserver = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if( mutation.type == "attributes" ) {
					if( mutation.attributeName == "data-is-intersecting" && mutation.target.dataset.isIntersecting == "true" ) {
						animateWords( mutation.target );
					}
				}
			});
		});

		var mutationConfig = { attributes: true, childList: true, characterData: true }

		kinetics.forEach(function(el) {
			mutationObserver.observe(el, mutationConfig);
			parseWords(el);
		});

	}


	function animateWords(el) {

		var spans = el.querySelectorAll("span");
		var duration = 3000;
		duration = spans.length * 120;
		if( el.dataset.duration ) {
			duration = el.dataset.duration;
		}
		var interval = duration / spans.length;
		var runningTotal = 0;
		var currentInterval = 0;

		for( var i=0; i<spans.length; i++ ) {
			if( isPunctuation( spans[i] ) ) {
				spans[i].classList.add("punctuation");
			}
			window.setTimeout( updateWord, i*interval, spans[i] );

			currentInterval = i * interval * ( spans[i].innerHTML.length / 10 );
			window.setTimeout( updateWord, currentInterval + runningTotal, spans[i] );
			runningTotal = runningTotal + currentInterval;
		}

	}

	function isPunctuation(el) {
		if("." == el.innerHTML ) {
			el.classList.add("period");
			return true;
		}
		if("," == el.innerHTML ) {
			el.classList.add("comma");
			return true;
		}
		if("?" == el.innerHTML ) {
			el.classList.add("question");
			return true;
		}
		if("!" == el.innerHTML ) {
			el.classList.add("exclamation");
			return true;
		}
		if("”" == el.innerHTML ) {
			el.classList.add("close-quote");
			return true;
		}
		if("“" == el.innerHTML ) {
			el.classList.add("open-quote");
			return true;
		}
	}

	function parseWords(el) {
		el.dataset.originalText = el.innerHTML;
		el.innerHTML = el.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span>$2</span>');
		var spans = el.querySelectorAll( "span" );
		spans.forEach(function(el) {
			el.innerHTML = el.innerHTML.replace(/[\.\?\!,“”]/g, "<span>$&</span>");
		});
	}

	function updateWord(el) {
		el.classList.add("visible");
	}


})();



( function() {

	document.addEventListener( "DOMContentLoaded", initIO );

	function initIO() {
		els = document.querySelectorAll( ".entry-content > .wp-block-group, .entry-content > .wp-block-columns, .kinetic" );

		//** add intersection data to images and major sections **/
		if('IntersectionObserver' in window){
			let options = {
				root: null,
				rootMargin: '0px',
				threshold: buildThreshold( 50 )
			}
			let observer = new IntersectionObserver(observerCallback, options);

			els.forEach(function(el) {
				observer.observe(el);
			});
		}
	}

	function observerCallback(entries, observer) {

		entries.forEach(function(entry) {
			var top = entry.boundingClientRect.top;
			var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

			entry.target.dataset.isIntersecting = entry.isIntersecting;
			entry.target.style.setProperty( '--intersecting', entry.isIntersecting );
			entry.target.dataset.offTop = ( top < 0 );

			entry.target.style.setProperty( '--intersection-ratio', entry.intersectionRatio );
		});
	}

	function buildThreshold(num) {
		let thresholds = [];

		for (let i=1; i<=num; i++) {
			let ratio = i/num;
			thresholds.push(ratio);
		}

		thresholds.push(0);
		return thresholds;
	}

})();
