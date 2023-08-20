( function() {

	let els, fragment;


	window.addEventListener( "load", initAccordions );

	function initAccordions() {
		fragment = window.location.hash.substring(1);
		els = document.querySelectorAll( ".flair-accordion" );
		els.forEach(function( el , i) {
			addButton( els[i] );
		});
	}
	
	function addButton( el ) {
	
		var h, b;
		
		el.classList.add( "js" );
		
		h = el.querySelector( ".header" );
		
		b = document.createElement( "button" );
		b.innerHTML = "Toggle " + h.innerText;
		b.classList.add( "button" );
		b.classList.add( "flair-toggle-x" );
		b.setAttribute("aria-expanded", false );
		b.addEventListener( "click", handleClick );
		
		h.appendChild( b );
		var d = el.querySelector( ".detail" );
		
		d.style.visibility = "hidden"; // coupled with css, eliminates flash of content on load
		if( el.id == fragment ) {
			el.classList.add("open");			
		} else {
			el.classList.add("closed");
		}
		d.style.visibility = "visible";

	}
	
	function handleClick() {
		var a = this.closest( ".flair-accordion" );
		
		if( a.classList.contains("open") ) {
			a.classList.remove("open");
			a.classList.add("closed");
			this.setAttribute("aria-expanded", false );
			document.location.hash = '';
		} else {
			a.classList.remove("closed");
			a.classList.add("open");
			this.setAttribute("aria-expanded", true );
			var id = ( a.id ) ? a.id : '';
			document.location.hash = a.id;
		}
	//	console.log("that clicks");
	}


})();