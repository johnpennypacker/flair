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

const eyebrowIcon = (
    <svg
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
			focusable="false"
		>
			<rect x="1" y="1" width="22" height="22" fill="rgb(255,255,255)"/>
    	<rect x="1" y="3" width="14" height="2" fill="rgb(15,90,42)"/>
			<rect x="1" y="15" width="22" height="1" fill="rgb(47,47,47)"/>
			<rect x="1" y="18" width="22" height="1" fill="rgb(47,47,47)"/>
			<rect x="1" y="21" width="22" height="1" fill="rgb(47,47,47)"/>
			<rect x="1" y="7" width="22" height="5" fill="rgb(47,47,47)"/>
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
	icon: eyebrowIcon,
} );
