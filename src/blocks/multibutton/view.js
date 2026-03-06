(function(){

	document.addEventListener( "DOMContentLoaded", initMultibutton );

	/**
	 * Initialize the multibutton.
	 */
	function initMultibutton() {
		var els = document.querySelectorAll(".flair-multibutton");
		els.forEach(function(el) {

			// we'll switch the options to position absolute, but we want their width first
			var d = el.querySelector(".dropdown");
			d.style.minWidth = d.offsetWidth + "px";


			// this'll count as a focusout listener.
			document.body.addEventListener( "click", function(event) {
				if( el == event.target ) {
					event.preventDefault();
					event.stopPropagation();
					closeOptions(el);
					return false;
				}
			});


			var b = el.querySelector(".dropdown-toggle");
			b.addEventListener( "click", showOptionsHandler, false );

			var items = el.querySelectorAll(".dropdown-item");
			items.forEach(function(item) {
				item.addEventListener( "click", selectOptionHandler );
			});

			selectOption(items[0]);

			el.classList.add("has-js");

		});
	}


	/**
	 * Show the button options
	 */
	function showOptions(mb) {
		var options = mb.querySelector(".options");
		options.classList.add("shown");

		var t = mb.querySelector(".dropdown-toggle");
		t.ariaExpanded = true;

		var s = mb.querySelector(".selected");
		if( s ) {
			s.focus();
		}
		document.addEventListener("keydown", arrowNav );
	}

	function closeOptions(mb) {
		var options = mb.querySelector(".options");
		options.classList.remove("shown");

		var t = mb.querySelector(".dropdown-toggle");
		t.ariaExpanded = false;
		document.removeEventListener("keydown", arrowNav );
	}

	/**
	 * event handler wapper class for showOptions()
	 */
	function showOptionsHandler(event) {
		event.preventDefault();
		event.stopPropagation();
		var mb = event.target.closest(".flair-multibutton");
		if( mb.querySelector(".shown") ) {
			closeOptions(mb);
		} else {
			showOptions(mb);
		}
	}


	/**
	 * remove the selected className from all items
	 */
	function clearSelected(mb) {
		var items = mb.querySelectorAll(".dropdown-item");
		items.forEach(function(item) {
			item.classList.remove("selected");
		});
	}

	/**
	 * Select a particular option
	 */
	function selectOption(el) {
		var mb = el.closest(".flair-multibutton");
		var t = mb.querySelector(".action");

		t.href = el.href;
		t.innerHTML = el.innerHTML;

		clearSelected(mb);
		el.classList.add("selected");

		el.blur();

		closeOptions(mb);

	}

	/**
	 * event handler wapper class for selectOption()
	 */
	function selectOptionHandler(event) {
		if( event.target.href == window.location.href ) { // don't follow a link to the page we're already on
			event.preventDefault();
		}
		selectOption(event.target);
	}

	/**
	 * Code that lets the visitor navigate options with arrow keys.
	 */
	function arrowNav(event) {
		var mb = event.target.closest(".flair-multibutton");
		if( !mb ) {
			mb = document.querySelector(".flair-multibutton .shown").closest(".flair-multibutton");
		}
		var items = mb.querySelectorAll(".dropdown-item");
		var s = mb.querySelector(".selected");

		if( "Escape" == event.key ) {
			closeOptions(mb);
		}

		if( "ArrowDown" == event.key ) {
			event.preventDefault();
			if( ! mb.contains(document.activeElement) ) {
				items[0].focus();
			} else if ( document.activeElement.nextElementSibling ) {
				document.activeElement.nextElementSibling.focus();
			}
		}

		if( "ArrowUp" == event.key ) {
			event.preventDefault();
			if( ! mb.contains(document.activeElement) ) {
				items[items.length-1].focus();
			} else if( document.activeElement.previousElementSibling ) {
				document.activeElement.previousElementSibling.focus();
			}
		}
	}

})()

