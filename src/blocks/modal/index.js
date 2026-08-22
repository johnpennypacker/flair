/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

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
import save from './save';
import metadata from './block.json';

/**
 * Adds the "Opens a modal" control to core/button. It lives here, rather than in
 * its own module under src/, because a block's editorScript is loaded in the
 * editor whenever the block type is registered — which keeps all of the modal
 * code in one directory and needs no webpack entry or PHP of its own.
 */
import './trigger';

const icon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
		<path fill="currentColor" d="M3,4H21A1,1,0,0,1,22,5V19a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V5A1,1,0,0,1,3,4ZM4,6V18H20V6Z"/>
		<rect fill="currentColor" x="6" y="9" width="12" height="2"/>
		<rect fill="currentColor" x="6" y="13" width="7" height="2"/>
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
	icon,
	save
} );
