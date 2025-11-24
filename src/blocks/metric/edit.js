/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import {
	RichText
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


const calculateClassName = () => {
	let c = ['flair-metric'];
	return c.join(' ');
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {

	return (
		<div class="flair-wrapper flair-metric-wrapper">
			<div { ...useBlockProps({ className:calculateClassName() }) }>
					<RichText
					{ ...useBlockProps() }
					tagName='em'
					className=''
					disableLineBreaks='true'
					placeholder={__('100%')}
					value={attributes.number}
					allowedFormats={[ 'core/bold', 'core/italic', 'core/subscript', 'core/superscript', 'core/strikethrough' ]}
					onChange={( value ) => {
						setAttributes({
							number: value
						});
					}}
					/>
					<RichText
					{ ...useBlockProps() }
					tagName='span'
					className='qualifier'
					disableLineBreaks='true'
					placeholder={__('Awesome')}
					value={attributes.qualifier}
					allowedFormats={[ 'core/bold', 'core/italic', 'core/subscript', 'core/superscript', 'core/strikethrough' ]}
					onChange={( value ) => {
						setAttributes({
							qualifier: value
						});
					}}
					/>
			</div>
		</div>
	);


}
