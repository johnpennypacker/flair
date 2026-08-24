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
	InspectorControls,
	store as blockEditorStore
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

	// The two things the editor needs to know about this block's own subtree.
	// Read at the top level -- they used to be `useSelect` calls buried inside
	// the helpers below, which only worked because the helpers happened to be
	// called unconditionally and in a stable order on every render.
	const innerBlockSelected = useSelect(
		( select ) => select( blockEditorStore ).hasSelectedInnerBlock( props.clientId ),
		[ props.clientId ]
	);

	const innerBlocks = useSelect(
		( select ) => select( blockEditorStore ).getBlock( props.clientId )?.innerBlocks ?? [],
		[ props.clientId ]
	);

	// Selecting the block -- or any of its options -- opens the dropdown, the
	// way clicking the toggle does on the front end.
	const isOpen = isSelected || innerBlockSelected;

	// Mirrors template-parts/multibutton.php. `has-js` is unconditional here
	// because the editor is, by definition, the scripted case: it makes the
	// options overlay rather than sit in the flow, so a closed block is the
	// same height in the editor as it is on the front end.
	const calculateClassName = () => {
		let c = ['flair-multibutton has-js'];

		if( isOpen ) {
			c.push('is-open');
		}
		if( attributes.width ) {
			c.push( 'flair-width-' + attributes.width.replace("%", "") );
		}

		return c.join(' ');
	}

	// The action shows whichever option is currently selected; with nothing
	// selected yet that is the first one, which is what view.js does on load.
	const getFirstButton = () => {
		if( innerBlocks.length > 0 ) {
			return innerBlocks[0].attributes;
		}
		return { "href": "#", "text": __( 'Add a button', 'flair' ) };
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
				<div className="dropdown">
					<div className="select">
						<button
							aria-expanded={ isOpen }
							aria-haspopup="true"
							className="dropdown-toggle"
						>
							<span className="flair-sr-only">{ __( 'Select an action', 'flair' ) }</span>
						</button>
						{ /*
						  * An anchor rather than a button, and href="#" rather
						  * than a real target, because that is what
						  * template-parts/multibutton.php renders -- a theme
						  * styling `a` inside the block has to reach this in
						  * the editor too. It navigates nowhere here, which is
						  * what the rule below objects to.
						  */ }
						{ /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
						<a
							href="#"
							className="action button"
							onClick={ ( event ) => event.preventDefault() }
						>{ firstButton.text }</a>
					</div>
					<div className={ isOpen ? 'options shown' : 'options' }>
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
