/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import {
	InspectorControls,
	RichText
} from '@wordpress/block-editor';

import {
	PanelBody,
	PanelRow,
	SelectControl,
	ToggleControl
} from "@wordpress/components";

import {
	createBlock,
	getDefaultBlockName
} from '@wordpress/blocks';

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


const elements = [
	{ value: 0, label: __( 'Select an element...' ) },
	{ value: 'div', label: __( '<div>' ) },
	{ value: 'h1', label: __( '<h1>' ) }
];

const calculateClassName = () => {
	let c = ['flair-milestone'];
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
// export default function Edit({ attributes, setAttributes, isSelected }) {
export default function Edit(props) {

	const { element, content } = props.attributes;
	const setAttributes = props.setAttributes;

	return (
		<>
		<InspectorControls>
			<PanelBody
				title={ __( 'Eyebrow properties', 'flair' ) }
				initialOpen="true"
			>
				<PanelRow>
					<fieldset>
						<SelectControl
							label={__('Element')}
							options={elements}
							value={element}
							onChange={( value ) => {
								setAttributes({
									element: value
								});
							}}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
					</fieldset>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
		<div class="flair-wrapper flair-eyebrow-wrapper">
			<div { ...useBlockProps({ className:calculateClassName() }) }>
				<RichText
				tagName='div'
				className='eyebrow'
				disableLineBreaks='true'
				placeholder={__('Eyebrow')}
				value={content}
				allowedFormats={[ 'core/bold', 'core/italic', 'core/subscript', 'core/superscript', 'core/strikethrough' ]}
				onChange={( value ) => {
					setAttributes({
						content: value
					});
				}}
				__unstableOnSplitAtEnd={ () =>
					props.insertBlocksAfter(
						createBlock( getDefaultBlockName() )
					)
				}
				/>
			</div>
		</div>
		</>
	);

}
