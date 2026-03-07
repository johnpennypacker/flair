/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { useState } from 'react';

import { __ } from '@wordpress/i18n';

import {
	ButtonBlockAppender,
	InnerBlocks,
	InspectorControls
} from '@wordpress/block-editor';

import {
	Flex,
	FlexBlock,
	FlexItem,
	PanelBody,
	PanelRow,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalUnitControl as UnitControl,
	SelectControl
} from '@wordpress/components';

import {
	useSelect
} from '@wordpress/data';

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
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit(props) {

	const { attributes, setAttributes, isSelected } = props;

  const [ width, setWidth ] = useState( attributes.width );

  const resetAll = () => {
    setWidth("100%");
		setAttributes( { width: "100%" } );
  }


	const widthToggle = () => {
		return (
		<>
			<ToolsPanel
			title={ __( 'Settings', 'flair' ) }
			label={ __( 'Dimensions' ) }
			resetAll={ resetAll }
			>
				<ToolsPanelItem
					hasValue={ () => !! width }
					label={ __( 'Width' ) }
					onDeselect={ () => setWidth() }
				>
					<ToggleGroupControl
								label={__("Width")}
								value={width}
					onChange={(v) => {
						setWidth(v);
						setAttributes( { width: v } );
					}}
					__next40pxDefaultSize
					__nextHasNoMarginBottom
						>
								<ToggleGroupControlOption value="25%" label="25%" />
								<ToggleGroupControlOption value="50%" label="50%" />
								<ToggleGroupControlOption value="75%" label="75%" />
								<ToggleGroupControlOption value="100%" label="100%" />
					</ToggleGroupControl>
					<UnitControl
						__next40pxDefaultSize
						className="hidden"
						disableUnits="true"
						label={ __( 'Width' ) }
						onChange={ setWidth }
						value={ width }
					/>
				</ToolsPanelItem>
			</ToolsPanel>

		</>
    );
	}

	const calculateClassName = () => {
		let c = ['flair-wrapper flair-multibutton is-layout-flex'];


		const innerBlockSelected = useSelect(
			(select) => select( 'core/block-editor' ).hasSelectedInnerBlock( props.clientId )
		);

		if( isSelected || innerBlockSelected ) {
			c.push('is-open');
		}
		let w = attributes.width || 100;
		if( attributes.width ) {
			c.push( 'flair-width-' + attributes.width.replace("%", "") );
		}

		return c.join(' ');
	}

	const getFirstButton = () => {
		const { store: blockEditorStore } = wp.blockEditor;
		const innerBlocks = useSelect(
			(select) => select(blockEditorStore).getBlock(props.clientId).innerBlocks,
		);
		if(innerBlocks.length > 0) {
			return innerBlocks[0].attributes;
		}
		return { "href": "#", "text": "Add a button"};
	}



	const MULTIBUTTON_TEMPLATE = [
		[ 'flair/multibutton-button', {} ],
		[ 'flair/multibutton-button', {} ],
		[ 'flair/multibutton-button', {} ]
	];

	let firstButton = getFirstButton();

	return (
		<>
			<InspectorControls>
				{widthToggle()}
  		</InspectorControls>

			<div { ...useBlockProps({ className:calculateClassName() }) }>
				<div class="dropdown">
					<div class="select">
						<button aria-expanded="false" aria-haspopup="true" class="dropdown-toggle"><span>Other options</span></button>
						<span href="" class="action button">{ firstButton.text }</span>
					</div>
					<div class="options">
						<InnerBlocks
							orientation="vertical"
							template={ MULTIBUTTON_TEMPLATE }
							templateLock={false}
						/>
					</div>
				</div>
			</div>
		</>
	);

}
