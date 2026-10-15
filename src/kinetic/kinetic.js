( function() {

	var kinetics;

	document.addEventListener( "DOMContentLoaded", initKinetic );

	function initKinetic() {

		kinetics = document.querySelectorAll( ".kinetic" );

		kinetics.forEach(function(el) {
			parseWords(el);
		});

		if( ! ( 'IntersectionObserver' in window ) ) {
			kinetics.forEach( animateWords );
			return;
		}

		// Animate each sentence once, the first time any of it scrolls into view.
		var observer = new IntersectionObserver(function(entries) {
			entries.forEach(function(entry) {
				if( entry.isIntersecting ) {
					observer.unobserve( entry.target );
					animateWords( entry.target );
				}
			});
		});

		kinetics.forEach(function(el) {
			observer.observe(el);
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
