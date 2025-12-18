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
	{ value: 'p', label: __( '<p>' ) },
	{ value: 'h1', label: __( '<h1>' ) },
	{ value: 'h2', label: __( '<h2>' ) },
	{ value: 'h3', label: __( '<h3>' ) },
	{ value: 'h4', label: __( '<h4>' ) },
	{ value: 'h5', label: __( '<h5>' ) },
	{ value: 'h6', label: __( '<h6>' ) },
	{ value: 'aside', label: __( '<aside>' ) },
];

const calculateClassName = () => {
	let c = ['flair-wrapper flair-eyebrow-wrapper'];
	return c.join(' ');
}

const getElement = (el) => {
	if( !! el ) {
		return el;
	} else {
		return "div";
	}
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
		<div { ...useBlockProps({ className:calculateClassName() }) }>
			<div class="flair-eyebrow">
				<RichText
				tagName={ getElement(element) }
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
