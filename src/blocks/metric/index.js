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
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
			<rect x="2" y="16" class="st0" width="20" height="2" fill="rgb(47,47,47)"/>
			<rect x="2" y="20" class="st0" width="20" height="2" fill="rgb(47,47,47)"/>
			<path class="st0" d="M17,7V5h-2V3h-2v2h-2V3H9v2H7v2h2v2H7v2h2v2h2v-2h2v2h2v-2h2V9h-2V7H17z M13,9h-2V7h2V9z" fill="rgb(47,47,47)"/>
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
