/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */

import { useState } from 'react';

import { __ } from '@wordpress/i18n';

import {
	InnerBlocks,
	InspectorControls
} from '@wordpress/block-editor';

import {
	PanelBody,
	PanelRow,
	ToggleControl,
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

	const calculateClassName = () => {
		let c = ['flair-carousel'];
		if( attributes.showArrows ) {
			c.push( 'has-arrows' );
		}
		if( attributes.showDots ) {
			c.push( 'has-dots' );
		}
		return c.join(' ');
	}

	const perPageToggles = () => {
		return (
		<>
        <ToggleGroupControl
            label={__("Slides per page", "flair")}
            value={attributes.perpage}
			onChange={( value ) => {
				setAttributes({
					perpage: value
				});
			}}
			__next40pxDefaultSize
			__nextHasNoMarginBottom
        >
            <ToggleGroupControlOption value="1" label={__("One", "flair")} />
            <ToggleGroupControlOption value="2" label={__("Two", "flair")} />
            <ToggleGroupControlOption value="3" label={__("Three", "flair")} />
        </ToggleGroupControl>
		<p
		class="block-editor-hooks__layout-constrained-helptext"
		style={{marginBlockEnd:'1rem'}}
		>Number of slides to show per screen — space permitting.</p>
		</>
    );
	}

	const CAROUSEL_TEMPLATE = [
		[ 'flair/carousel-slide', {} ],
		[ 'flair/carousel-slide', {} ],
		[ 'flair/carousel-slide', {} ]
	];

	return (
		<>
		<InspectorControls>
			<PanelBody
				title={ __( 'Carousel properties', 'flair' ) }
			>
				<PanelRow>
						<ToggleControl
							label="Show Arrow Buttons"
							checked={attributes.showArrows}
							onChange={ (value) => {
								setAttributes({
									showArrows: value
								});
							}}
							__nextHasNoMarginBottom
						/>
				</PanelRow>
				<PanelRow>
						<ToggleControl
							label="Show Dots"
							checked={attributes.showDots}
							onChange={ (value) => {
								setAttributes({
									showDots: value
								});
							}}
							__nextHasNoMarginBottom
						/>
				</PanelRow>
				<PanelRow><fieldset>{perPageToggles()}</fieldset></PanelRow>
			</PanelBody>
		</InspectorControls>

			<div { ...useBlockProps({ className:calculateClassName() }) }>
				<InnerBlocks
					allowedBlocks={ ['flair/carousel-slide'] }
					orientation="horizontal"
					template={ CAROUSEL_TEMPLATE }
					templateLock={false}
				/>
			</div>
		</>
	);

}
