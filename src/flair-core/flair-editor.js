import { addFilter } from '@wordpress/hooks';

/**
 * Enables all of the align supports on group blocks.
 *
 * This has to be in place before core registers its blocks, so it's added as
 * soon as the script runs. It used to wait for window `load`, by which point
 * core/group was already registered and the filter never applied.
 */
function addGroupAlignments( settings, name ) {
	if ( 'core/group' === name && 'undefined' !== typeof settings.supports ) {
		settings.supports.align = true;
	}
	return settings;
}

addFilter( 'blocks.registerBlockType', 'flair/groupAlign', addGroupAlignments );
