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

	// A comma-grouped number ("4,055") is one count, not two.
	const countablize = (el) => {
		el.innerHTML = el.innerHTML.replace(/(\d{1,3}(?:,\d{3})+|\d+)/g, '<span class="metric-count">$1</span>')
	}

	const countUp = (m) => {
		if( m.dataset.didAnimate == true ) {
			return;
		}
		let el = m.querySelector("em:first-child");
		let spans = el.querySelectorAll(".metric-count");
		spans.forEach(function(s) {
			s.dataset.original = s.innerText;
			animateSpan( s, 0, parseInt( s.dataset.original.replace( /,/g, '' ), 10 ), maxDuration );
		});
		m.dataset.didAnimate = true;
	}

	// Intermediate values keep the original's shape: commas if it had them,
	// zero padding if it had leading zeros ("007"). The last frame restores
	// the original text exactly.
	const formatCount = (n, original) => {
		if ( original.includes(',') ) {
			return n.toLocaleString('en-US');
		}
		return /^0\d/.test(original) ? String(n).padStart(original.length, '0') : String(n);
	}

	const animateSpan = (s, start, end, duration) => {
		let startTimestamp = null;
		const original = s.dataset.original;
		const step = (timestamp) => {
			if (!startTimestamp) startTimestamp = timestamp;
			const progress = Math.min((timestamp - startTimestamp) / duration, 1);
			if (progress < 1) {
				s.textContent = formatCount(Math.floor(progress * (end - start) + start), original);
				window.requestAnimationFrame(step);
			} else {
				s.textContent = original;
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
