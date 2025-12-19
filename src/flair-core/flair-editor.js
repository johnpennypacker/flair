// this adds wp as a dependency so the code below doesn't run too early.
import { __ } from '@wordpress/i18n';

( function() {

	// enables all of the align supports on group blocks
	function addGroupAlignments( settings, name ) {
		if ( 'core/group' === name ) {
			if ( 'undefined' !== typeof settings.supports ) {
				settings.supports.align = true;
			}
		}
		return settings;
	}

	window.addEventListener("load", (event) => {
		// addFilter( 'hookName', 'namespace', callback, priority )
		wp.hooks.addFilter( 'blocks.registerBlockType', 'flair/groupAlign', addGroupAlignments );
	})

})();
