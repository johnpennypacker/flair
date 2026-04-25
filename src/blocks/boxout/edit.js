/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import {
	InnerBlocks,
	InspectorControls
} from '@wordpress/block-editor';

import {
	PanelBody,
	PanelRow,
	SelectControl
} from '@wordpress/components';


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
	let c = ['flair-wrapper flair-boxout-wrapper'];
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
				title={ __( 'Boxout properties', 'flair' ) }
			>
				<PanelRow>
					<SelectControl
							label="HTML Element"
							value={ attributes.element }
							options={ [
								{ label: 'Default (<aside>)', value: 'aside' },
								{ label: '<div>', value: 'div' },
								{ label: '<section>', value: 'section' },
							] }
							onChange={( value ) => {
								setAttributes({
									element: value
								});
							}}
							__next40pxDefaultSize
							__nextHasNoMarginBottom
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
		<div { ...useBlockProps({ className:calculateClassName() }) }>
			<div class="flair-boxout">
				<InnerBlocks defaultBlock={['core/paragraph', {placeholder: "Lorem ipsum..."}]} directInsert />
			</div>
		</div>
	</>
	);


}
