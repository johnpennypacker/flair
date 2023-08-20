( function() {

	let els;

	window.addEventListener( "load", initAccordions );

	function initAccordions() {
		els = document.querySelectorAll( ".flair-accordion" );
		els.forEach(function( el , i) {
			addButton( els[i] );
		});
	}
	
	function addButton( el ) {
	
		var h, b;
		
		el.classList.add( "js" );
		
		h = el.querySelector( ".header" );
		
		b = document.createElement( "BUTTON" );
		b.innerHTML = "Toggle " + h.innerText;
		b.classList.add( "button" );
		b.classList.add( "flair-toggle-x" );
		b.setAttribute("aria-expanded", false );
		b.addEventListener( "click", handleClick );
		
		h.appendChild( b );
		var d = el.querySelector( ".detail" );
		d.style.visibility = "hidden"; // coupled with css, eliminates flash of content on load
		el.classList.add("closed");
		d.style.visibility = "visible";

	}
	
	function handleClick() {
		var a = this.closest( ".flair-accordion" );
		if( a.classList.contains("open") ) {
			a.classList.remove("open");
			a.classList.add("closed");
			this.setAttribute("aria-expanded", false );
		} else {
			a.classList.remove("closed");
			a.classList.add("open");
			this.setAttribute("aria-expanded", true );
		}
	//	console.log("that clicks");
	}


})();