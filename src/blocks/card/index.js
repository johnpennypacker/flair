/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { createBlock, registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
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


const cardIcon = (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<path fill="#222" d="M3,22h18c.55,0,1-.45,1-1V3c0-.55-.45-1-1-1H3c-.55,0-1,.45-1,1v18c0,.55.45,1,1,1ZM20,11v9H4v-9h16Z"/>
		<rect fill="currentColor" x="4" y="4" width="16" height="5"/>
		<rect fill="currentColor" x="6" y="13" width="7" height="1"/>
		<rect fill="currentColor" x="6" y="15" width="11" height="1"/>
		<rect fill="currentColor" x="6" y="17" width="11" height="1"/>
	</svg>
);

/**
 * Cards from before 2.3.0 kept their excerpt, attribution and button as
 * attributes. Opening one moves them into the paragraphs a new card starts
 * with (see TEMPLATE in edit.js), and saving keeps them that way. Until it's
 * opened, `template-parts/card.php` renders the old attributes, so the front
 * end doesn't change either way.
 *
 * Those cards saved no markup, which the current save reproduces exactly, so
 * they're valid -- the migration runs because isEligible asks for it.
 */
const fieldsToParagraphs = {
	attributes: metadata.attributes,
	supports: metadata.supports,
	save: () => null,
	isEligible: ( attributes, innerBlocks ) => (
		! innerBlocks.length
		&& [ 'excerpt', 'attribution', 'button' ].some( ( name ) => attributes[ name ]?.trim() )
	),
	migrate: ( attributes ) => {
		const { excerpt, attribution, button, ...rest } = attributes;
		const paragraphs = [
			[ 'excerpt', excerpt, __( 'Paragraph - excerpt', 'flair' ) ],
			[ 'attribution', attribution, __( 'Paragraph - attribution', 'flair' ) ],
			[ 'button', button, __( 'Paragraph - button', 'flair' ) ],
		]
			.filter( ( [ , content ] ) => content?.trim() )
			.map( ( [ className, content, name ] ) => createBlock( 'core/paragraph', { className, content, metadata: { name } } ) );
		return [ rest, paragraphs ];
	},
};

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
	// The body is inner blocks; everything else is attributes, rendered in PHP.
	save: () => <InnerBlocks.Content />,
	deprecated: [ fieldsToParagraphs ],
	icon: cardIcon,
} );

