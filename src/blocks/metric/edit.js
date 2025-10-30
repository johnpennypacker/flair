/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { 
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';

import { 
	PanelBody,
	PanelRow,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption
} from "@wordpress/components";

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
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {

	const orientationToggles = () => {
		let help = 'Auto will usually display as vertical. In certain conditions, it will appear horizontal.'
		switch(attributes.orientation) {
			case 'vertical': 
				help = 'The card will always display as a vertical stack.';
				break;
			case 'horizontal': 
				help = 'The card will always display side by side as a horizontal row.';
				break;
		}
		return (
		<>
		<ToggleGroupControl
			label={__("Orientation")}
			value={attributes.orientation}
			onChange={( value ) => {
				setAttributes({ 
					orientation: value 
				});
			}}
			__next40pxDefaultSize
			__nextHasNoMarginBottom
		>
			<ToggleGroupControlOption value="auto" label="Auto" />
			<ToggleGroupControlOption value="vertical" label="Vertical" />
			<ToggleGroupControlOption value="horizontal" label="Horizontal" />
		</ToggleGroupControl>
		<p
		style={{marginBlockEnd:'1rem'}}
		class="block-editor-hooks__layout-constrained-helptext">
		{help}
		</p>
		</>
	);
	}

	const calculateClassName = () => {
		let c = ['flair-metric'];
		c.push( 'orintation-' + attributes.orientation );
		return c.join(' ');
	}
	return (
		<>
		<InspectorControls>
			<PanelBody title={ __( 'Card properties', 'flair' ) }>
				<PanelRow><fieldset>{orientationToggles()}</fieldset></PanelRow>
			</PanelBody>
		</InspectorControls>
		<div class="flair-wrapper flair-metric-wrapper">
			<div { ...useBlockProps({ className:calculateClassName() }) }>  
				<RichText
				key="number"
				allowedFormats={[ "core/link" ]}
				className={( ! attributes.number ) ? "is-empty" : ""}
				disableLineBreaks={true}
				tagName="em"
				value={attributes.number}
				onChange={( value ) => {
					setAttributes( { number: value } ); 
				}}
				placeholder={__( "100%" )}
				>
				</RichText>
				<RichText
				key="qualifier"
				allowedFormats={[ "core/link", "core/bold", "core/italic", "core/subscript", "core/superscript" ]}
				className={( ! attributes.qualifier ) ? "is-empty qualifier" : "qualifier"}
				disableLineBreaks={true}
				tagName="span"
				value={attributes.qualifier}
				onChange={( value ) => {
					setAttributes( { qualifier: value } ); 
				}}
				placeholder={__( "awesome" )}
				></RichText>
			</div>
		</div>
		</>
	);



}
