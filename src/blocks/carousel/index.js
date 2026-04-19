/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

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


const carouselIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<path d="M19.5,4.5v11H4.5V4.5h15M20,3H4c-.55,0-1,.45-1,1v12c0,.55.45,1,1,1h16c.55,0,1-.45,1-1V4c0-.55-.45-1-1-1h0Z"/>
		<circle fill="currentColor" cx="12" cy="19" r=".75"/>
		<circle cx="14.5" cy="19" r=".75"/>
		<circle cx="9.5" cy="19" r=".75"/>
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
	icon: carouselIcon,
	save: props => {
		return <InnerBlocks.Content />
	}


} );
