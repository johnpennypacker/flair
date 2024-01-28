/**
 * 
 */
( function() {

	window.addEventListener("DOMContentLoaded", OKZoomer);

	function OKZoomer() {

		const zoomers = document.querySelectorAll(".ok-zoomer");
	
		zoomers.forEach(function(el) {
			el.style.setProperty( "--mouse-pos-x", 0 );
			el.style.setProperty( "--mouse-pos-y", 0 );
			el.addEventListener( "mousemove", watchMouse, true );
			var glass = document.createElement("img");
			glass.src = el.querySelector("img").src;
			glass.className = "zoomer";
			el.appendChild(glass);
		});

	}

	function watchMouse(e) {
		var elRect = e.target.getBoundingClientRect();
		var x = e.clientX - elRect.left;
		var y = e.clientY - elRect.top;
		e.target.style.setProperty( "--mouse-pos-x", x );
		e.target.style.setProperty( "--mouse-pos-y", y );
		var px = x / elRect.width;
		var py = y / elRect.height;
		e.target.style.setProperty( "--mouse-pct-x", (px*100)+"%" );
		e.target.style.setProperty( "--mouse-pct-y", (py*100)+"%" );
	}



})();