/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from './block.json';


const tabIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<path d="M20,8.5v10H4V8.5h16M20.5,7H3.5c-.55,0-1,.45-1,1v11c0,.55.45,1,1,1h17c.55,0,1-.45,1-1v-11c0-.55-.45-1-1-1h0Z"/>
		<path fill="currentColor" d="M9.5,4.5h-5c-.55,0-1,.45-1,1v2h7v-2c0-.55-.45-1-1-1Z"/>
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
	icon: tabIcon,
	save: props => {
		return <InnerBlocks.Content />
	}

} );
