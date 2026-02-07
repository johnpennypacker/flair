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

const stackIcon = (
	<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path d="M18.805,13.052l4.211,1.837l-11.055,8.101l-11.02,-8.06l4.213,-1.849l-4.208,-3.078l3.784,-1.661l-3.78,-2.476l11.052,-4.85l11.023,4.81l-3.786,2.486l3.782,1.65l-4.216,3.09Zm-11.785,1.394l-2.096,0.919l7.036,5.146l7.068,-5.18l-2.089,-0.912l-4.973,3.645l-4.946,-3.618Zm4.945,1.139l7.069,-5.18l-1.792,-0.782l-5.271,3.461l-5.244,-3.434l-1.797,0.789l7.035,5.146Zm0.005,-4.892l6.87,-4.511l-6.836,-2.983l-6.871,3.016l6.837,4.478Z" fill="currentColor"/>
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
	icon: stackIcon,
	save: props => {
		return <InnerBlocks.Content />
	}
} );
