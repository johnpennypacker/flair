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

// addFilter( 'hookName', 'namespace', callback, priority )
wp.hooks.addFilter( 'blocks.registerBlockType', 'flair/groupAlign', addGroupAlignments );

})();
