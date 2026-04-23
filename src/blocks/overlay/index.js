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
import Save from './save';
import metadata from './block.json';


const icon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<rect fill="#222" x="3.5" y="3.5" width="17" height="17"/>
		<path d="M20.5,3.5v17H3.5V3.5h17M21,2H3c-.55,0-1,.45-1,1v18c0,.55.45,1,1,1h18c.55,0,1-.45,1-1V3c0-.55-.45-1-1-1h0Z"/>
		<rect fill="#fff" x="5.5" y="12.5" width="9" height="1.5"/>
		<rect fill="#fff" x="5.5" y="15" width="13" height="1.5"/>
		<rect fill="#fff" x="5.5" y="17.5" width="13" height="1.5"/>
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
	icon: icon,
	save: Save
} );

