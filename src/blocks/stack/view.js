
/**
 * 
 */
( function() {

	window.addEventListener("DOMContentLoaded", OKZoomer);

	function OKZoomer() {

		const stacks = document.querySelectorAll(".flair-stack");
	
		stacks.forEach(function(el) {
			el.style.setProperty( "--mouse-pos-x", 0 );
			el.style.setProperty( "--mouse-pos-y", 0 );
			el.addEventListener( "mousemove", watchMouse, true );
		});

	}

	function watchMouse(e) {
        var el = e.target.closest('.flair-stack');
		var elRect = e.target.getBoundingClientRect();
		var x = e.clientX - elRect.left;
		var y = e.clientY - elRect.top;
		el.style.setProperty( "--mouse-pos-x", x );
		el.style.setProperty( "--mouse-pos-y", y );

		var px = x / elRect.width;
		var py = y / elRect.height;
		// el.style.setProperty( "--mouse-pct-x", (px*100)+"%" );
		// el.style.setProperty( "--mouse-pct-y", (py*100)+"%" );
		el.style.setProperty( "--mouse-pct-x", px );
		el.style.setProperty( "--mouse-pct-y", py );

		el.style.setProperty( "--mouse-bias-x", calculateBias(px) );
		el.style.setProperty( "--mouse-bias-y", calculateBias(py) );
    }

    function calculateBias(v) {
        if( .5 == v ) {
            return 0;
        }
        if( v > .5 ) {
            return (v - .5) * 2;
        }
        if( v < 50 ) {
            return (.5 - v) * -2;
        }
        return v;
    }



})();