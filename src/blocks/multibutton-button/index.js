/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from './block.json';


const mbbIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<path d="M2,8v9c0,.55.45,1,1,1h18c.55,0,1-.45,1-1v-9c0-.55-.45-1-1-1H3c-.55,0-1,.45-1,1ZM20,16H4v-7h16v7Z"/>
		<rect fill="currentColor" x="6" y="11.5" width="2" height="2"/>
		<rect fill="currentColor" x="9" y="11.5" width="5" height="2"/>
		<rect fill="currentColor" x="15" y="11.5" width="3" height="2"/>
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
	icon: mbbIcon

} );
