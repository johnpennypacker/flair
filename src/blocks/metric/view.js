( function() {

	const maxDuration = 800;


	const initMetrics = () => {
		let metrics = document.querySelectorAll('.flair-metric');
		const observer = new MutationObserver(entersCallback);

		metrics.forEach(function(m) {
			let el = m.querySelector('em:first-child');
			m.dataset.original = m.innerHTML;
			m.dataset.didAnimate = false;
			countablize(el);
			observer.observe(m, { attributes: true });
		});

	}

	const countablize = (el) => {
		el.innerHTML = el.innerHTML.replace(/(\d+)/g, '<span class="metric-count">$1</span>')
	}

	const countUp = (m) => {
		if( m.dataset.didAnimate == true ) {
			return;
		}
		let el = m.querySelector("em:first-child");
		let spans = el.querySelectorAll(".metric-count");
		spans.forEach(function(s) {
			s.dataset.original = s.innerText;
			animateSpan( s, 0, s.dataset.original, maxDuration );
		});
		m.dataset.didAnimate = true;
	}

	const animateSpan = (s, start, end, duration) => {
		let startTimestamp = null;
		const step = (timestamp) => {
			if (!startTimestamp) startTimestamp = timestamp;
			const progress = Math.min((timestamp - startTimestamp) / duration, 1);
			s.innerHTML = Math.floor(progress * (end - start) + start);
			if (progress < 1) {
				window.requestAnimationFrame(step);
			}
		};
		window.requestAnimationFrame(step);
	}



	// Callback function to execute when mutations are observed
	const entersCallback = (mutationList, observer) => {
		for (const mutation of mutationList) {
			if( mutation.type === "attributes" && "data-intersection" == mutation.attributeName ) {
				let m = mutation.target;
				if( m.dataset.isIntersecting == "true" && m.dataset.didAnimate == "false" ) {
// 					console.log('count it up');
					countUp( m );
				}
// 				console.log(mutation);
// 				console.log(`The ${mutation.attributeName} attribute was modified.`);
			}
		}
	};

// 	// Later, you can stop observing
// 	observer.disconnect();


	document.addEventListener('DOMContentLoaded', initMetrics);

})();
