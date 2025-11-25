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
import metadata from './block.json';


const cardIcon = (
	 <svg
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			focusable="false"
	>
		<path d="M23.037,1.042l-22.037,0l0,22.03l22.037,-0l-0,-22.03Zm-1,1l-0,20.03c-0,-0 -20.037,-0 -20.037,-0c-0,-0 -0,-20.03 -0,-20.03l20.037,0Z"/>
		<path d="M23.037,1.042l-22.037,0l0,8.958l22.037,-0l-0,-8.958Zm-1,1l-0,6.958c-0,0 -20.037,0 -20.037,0c-0,-0 -0,-6.958 -0,-6.958l20.037,0Z"/>
		<path d="M1.26,2.771l21.411,6.631l0.296,-0.955l-21.411,-6.632l-0.296,0.956Z"/>
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
	icon: cardIcon,
} );

