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

const metricIcon = (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<polygon fill="currentColor" points="10.84 10.5 12.84 10.5 13.16 8.5 11.16 8.5 10.84 10.5"/>
			<path fill="currentColor" d="M21,2H3c-.55,0-1,.45-1,1v18c0,.55.45,1,1,1h18c.55,0,1-.45,1-1V3c0-.55-.45-1-1-1ZM16.66,8.5h-1.5l-.32,2h1.5l-.32,2h-1.5l-.24,1.5h-2l.24-1.5h-2l-.24,1.5h-2l.24-1.5h-1.5l.32-2h1.5l.32-2h-1.5l.32-2h1.5l.24-1.5h2l-.24,1.5h2l.24-1.5h2l-.24,1.5h1.5l-.32,2Z"/>
			<rect fill="#fff" x="5" y="16" width="14" height="1"/>
			<rect fill="#fff" x="5" y="18" width="14" height="1"/>
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
	icon: metricIcon,

} );
