/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */

import { __ } from '@wordpress/i18n';

import {
	InnerBlocks,
	RichText,
} from '@wordpress/block-editor';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * The label doubles as the tab button text on the front end, and as the
 * fallback heading when javascript is unavailable. The ID can be overridden
 * in Advanced > HTML Anchor.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit(props) {

	const { attributes, setAttributes } = props;

	return (
		<section { ...useBlockProps({ className: 'flair-tab' }) }>
			<RichText
				tagName="h3"
				className="flair-tab-label"
				allowedFormats={ [] }
				withoutInteractiveFormatting
				value={ attributes.label }
				onChange={ ( label ) => setAttributes( { label } ) }
				placeholder={ __( 'Tab title…', 'flair' ) }
			/>
			<InnerBlocks defaultBlock={['core/paragraph', {placeholder: "Lorem ipsum..."}]} />
		</section>
	);

}
