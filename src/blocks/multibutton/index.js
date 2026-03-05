/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor'

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import metadata from './block.json';


const mbIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<path fill="#222" d="M2,8v9c0,.55.45,1,1,1h18c.55,0,1-.45,1-1v-9c0-.55-.45-1-1-1H3c-.55,0-1,.45-1,1ZM14,16H4v-7h10v7Z"/>
		<rect fill="currentColor" x="16" y="9" width="4" height="7"/>
		<polygon fill="#222" points="19 12 17 12 18 13 19 12 19 12"/>
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
	icon: mbIcon,
	save: props => {
		return <InnerBlocks.Content />
	}

} );
