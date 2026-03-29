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
	__experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
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

const calculateClassName = (attributes) => {
	let c = ['flair-wrapper flair-milestone-wrapper'];
	c.push('marker-' + attributes.marker);
	c.push('layout-' + attributes.layout);
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
export default function Edit(props) {
	const { attributes, setAttributes, isSelected } = props;

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
				<PanelRow>
					<ToggleGroupControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						isBlock
						label="Layout"
						value={attributes.layout}
						onChange={( value ) => {
								setAttributes({
									layout: value
								});
							}}
					>
						<ToggleGroupControlOptionIcon
							label="Left"
							value="left"
							icon={(
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
									<rect fill="currentColor" x="4" y="4" width="10" height="8"/>
									<rect fill="currentColor" x="2" y="2" width="1" height="12"/>
								</svg>
							)}
						/>
						<ToggleGroupControlOptionIcon
							label="Center Left"
							value="center-left"
							icon={(
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
									<rect fill="currentColor" x="3" y="4" width="5" height="8"/>
									<rect fill="currentColor" x="9" y="2" width="1" height="12"/>
								</svg>
							)}
						/>
						<ToggleGroupControlOptionIcon
							label="Center Right"
							value="center-right"
							icon={(
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
									<rect fill="currentColor" x="8" y="4" width="5" height="8"/>
									<rect fill="currentColor" x="6" y="2" width="1" height="12"/>
								</svg>
							)}
						/>
						<ToggleGroupControlOptionIcon
							label="Right"
							value="right"
							icon={(
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
									<rect fill="currentColor" x="2" y="4" width="10" height="8"/>
									<rect fill="currentColor" x="13" y="2" width="1" height="12"/>
								</svg>
							)}
						/>

					</ToggleGroupControl>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
		<div  { ...useBlockProps({ className:calculateClassName(attributes) }) }>
			<div class="flair-milestone">
				<div class="timeline" />
				<div class="details">
					<RichText
					tagName='div'
					className='date flair-eyebrow'
					placeholder={__('Apr 30')}
					value={attributes.date}
					allowedFormats={[ 'core/bold', 'core/italic', 'core/subscript', 'core/superscript', 'core/strikethrough' ]}
					onChange={( value ) => {
						setAttributes({
							date: value
						});
					}}
					/>
					<InnerBlocks defaultBlock={['core/paragraph', {placeholder: "Lorem ipsum..."}]} />
				</div>
			</div>
		</div>
		</>
	);

}
