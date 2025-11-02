/**
 * Use this file for JavaScript code that you want to run in the front-end 
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any 
 * JavaScript running in the front-end, then you should delete this file and remove 
 * the `viewScript` property from `block.json`. 
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */
 
( function() {

	let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
	let elTop = vh;
	let els;

	window.addEventListener( "load", initLines );
	function initLines() {
		els = document.querySelectorAll( ".sidler .line" );
		if ( ! els ) {
			return;
		}
		els.forEach(function(el) {
			el.style.setProperty( "--line-width", el.getBoundingClientRect().width );
			el.style.setProperty( "--line-height", el.getBoundingClientRect().height );
		});
	}

	window.addEventListener( "scroll", calcTop );
	function calcTop(e) {
		if ( ! els ) {
			return;
		}
		els.forEach(function(el) {
			if( el.parentNode.dataset.isIntersecting == "true" ) {
				el.style.setProperty( "--top-percent", el.getBoundingClientRect().top / vh );
				el.style.setProperty( "--mid-percent", (el.getBoundingClientRect().bottom - (el.getBoundingClientRect().top/2)) / vh );
			} else {
				el.style.setProperty( "--top-percent", 1 );
				el.style.setProperty( "--mid-percent", 1 );
			}
		});
	}

})();