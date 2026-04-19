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


const carouselSlideIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<polygon fill="currentColor" points="17.5 15.5 6.5 15.5 6.5 12 17.5 8.5 17.5 15.5"/>
		<rect x="20.25" y="6" width="1.5" height="8"/>
		<rect x="2.25" y="6" width="1.5" height="8"/>
		<path d="M17.5,4.5v11H6.5V4.5h11M18,3H6c-.55,0-1,.45-1,1v12c0,.55.45,1,1,1h12c.55,0,1-.45,1-1V4c0-.55-.45-1-1-1h0Z"/>
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
 	icon: carouselSlideIcon,
	save: props => {
		return <InnerBlocks.Content />
	}

} );
