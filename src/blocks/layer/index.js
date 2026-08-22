/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor'

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from './block.json';

const layerIcon = (
	<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path d="M23.021,9.962l-11.055,8.102l-11.02,-8.061l11.051,-4.85l11.024,4.809Zm-3.987,0.443l-7.034,-3.069l-7.07,3.103l7.035,5.146l7.069,-5.18Z" fill="currentColor" />
	</svg>
);

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	icon: layerIcon,
	save: props => {
		return <InnerBlocks.Content />
	}
} );
