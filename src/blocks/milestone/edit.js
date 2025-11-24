/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import {
	BlockControls,
	InspectorControls,
	InnerBlocks,
	RichText
} from '@wordpress/block-editor';

import {
	PanelBody,
	PanelRow,
	SelectControl,
	ToggleControl
} from "@wordpress/components";

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



const markers = [
	{ value: 0, label: __( 'Select a Marker...' ) },
	{ value: 'diamond', label: __( 'Diamond (Solid)' ) },
	{ value: 'diamond-hollow', label: __( 'Diamond (Hollow)' ) },
	{ value: 'dot', label: __( 'Dot (Solid)' ) },
	{ value: 'dot-hollow', label: __( 'Dot (Hollow)' ) },
	{ value: 'square', label: __( 'Square (Solid)' ) },
	{ value: 'square-hollow', label: __( 'Square (Hollow)' ) }
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
export default function Edit({ attributes, setAttributes }) {

	return (
		<>
		<InspectorControls>
			<PanelBody
				title={ __( 'Milestone properties', 'flair' ) }
				initialOpen="true"
			>

				<PanelRow>
					<fieldset>
						<SelectControl
							label={__('Marker')}
							options={markers}
							value={attributes.marker}
							onChange={( value ) => {
								setAttributes({
									marker: value
								});
							}}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
					</fieldset>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
		<div class="flair-wrapper flair-milestone-wrapper">
			<div { ...useBlockProps({ className:calculateClassName() }) }>
				<RichText
				tagName='div'
				className='eyebrow'
				placeholder={__('Apr 30')}
				value={attributes.date}
				allowedFormats={[ 'core/bold', 'core/italic', 'core/subscript', 'core/superscript', 'core/strikethrough' ]}
				onChange={( value ) => {
					setAttributes({
						date: value
					});
				}}
				/>
				<InnerBlocks defaultBlock={['core/paragraph', {placeholder: "Lorem ipsum..."}]} directInsert />
			</div>
		</div>
		</>
	);

}
