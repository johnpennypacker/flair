/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */

import { useState } from 'react';

import { __ } from '@wordpress/i18n';

import {
	BlockControls,
	InnerBlocks,
	InspectorControls,
	LinkControl,
	MediaPlaceholder,
	MediaReplaceFlow,

	PanelColorSettings,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,

	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	RichText
} from '@wordpress/block-editor';
import {
	Button,
	Disabled,
	FocalPointPicker,
	PanelBody,
	PanelRow,
	Popover,
	RangeControl,
	ToolbarButton,
	__experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption
} from "@wordpress/components";
import {
	link,
	linkOff
} from '@wordpress/icons';


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
 * Turn a focal point ({ x, y } in the 0-1 range the picker speaks) into the
 * `object-position` value the stylesheet reads off `--flair-focal-point`.
 * Keeps two decimals, which is finer than a drag on the picker can resolve.
 * `template-parts/overlay.php` does the same arithmetic for the front end.
 *
 * @param {?{x: number, y: number}} point Focal point, or nothing for centre.
 * @return {string} A CSS position pair, e.g. `50% 25%`.
 */
const focalPointToPosition = ( point ) => {
	const percent = ( n ) => {
		const value = parseFloat( n );
		if( ! Number.isFinite( value ) ) {
			return 50;
		}
		return Math.round( Math.min( Math.max( value, 0 ), 1 ) * 10000 ) / 100;
	};
	const { x, y } = point || {};
	return `${ percent( x ) }% ${ percent( y ) }%`;
};

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

	//console.log('atts', attributes);
	//console.log( 'props', useBlockProps() );

	const blockIsSelected = () => {
		let props = useBlockProps();
		return props.className.includes("is-selected");
	}

	const onSelectMedia = (media) => {
		setAttributes({
			asset: {
				alt: media.alt,
				id: media.id,
				url: media.url,
			},
		});
	};

	const [ isEditingURL, setIsEditingURL ] = useState( false );
	const isURLSet = () => {
		if( !attributes.href ) {
			return false;
		}
		if( attributes.href.length > 2 ) {
			return true;
		}
		if( '#' === attributes.href ) {
			return true;
		}
		return false;
	}

	const linkPopover = () => {

		const [ popoverAnchor, setPopoverAnchor ] = useState( null );
		const [ isEditingURL, setIsEditingURL ] = useState( false );

		return(
			<>
				<ToolbarButton
					ref={ setPopoverAnchor }
					name="link"
					icon={ link }
					title={ __( 'Link', 'flair' ) }
					onClick={ () => setIsEditingURL( true ) }
					isActive={ !! attributes.href }
				/>
				{ isEditingURL && (
					<Popover
						anchor={ popoverAnchor }
						onClose={ () => setIsEditingURL( false ) }
						focusOnMount={ true }
						offset={ 10 }
						className="enable-linked-groups__link-popover"
						variant="alternate"
					>
						<LinkControl
							value={ {
								url: attributes.href,
								opensInNewTab: attributes.target === '_blank',
							} }

							onChange={ ( {
								url: newURL = '',
								opensInNewTab,
							} ) => {
								setAttributes( {
									href: newURL,
									target: opensInNewTab
										? '_blank'
										: undefined,
								} );
								setIsEditingURL( false );
							} }
							onRemove={ () => {
								setAttributes({
									href: null,
									target: undefined,
								});
							}}
						/>
					</Popover>
				) }

			</>
		);
	}


	const headingLevelToggles = () => {
		return (
		<>
        <ToggleGroupControl
            label={__("Heading level")}
            value={attributes.heading}
			onChange={( value ) => {
				setAttributes({
					heading: value
				});
			}}
			__next40pxDefaultSize
			__nextHasNoMarginBottom
        >
            <ToggleGroupControlOption value="h1" label="h1" />
            <ToggleGroupControlOption value="h2" label="h2" />
            <ToggleGroupControlOption value="h3" label="h3" />
            <ToggleGroupControlOption value="h4" label="h4" />
            <ToggleGroupControlOption value="h5" label="h5" />
            <ToggleGroupControlOption value="h6" label="h6" />
        </ToggleGroupControl>
		<p
		class="block-editor-hooks__layout-constrained-helptext"
		style={{marginBlockEnd:'1rem'}}
		>Be sure that your headings follow a logical nested hierarchy.</p>
		</>
    );
	}

	const aspectRatioToggles = () => {
		return (
		<>
        <ToggleGroupControl
            label={__("Aspect ratio")}
            value={attributes.aspect}
			onChange={( value ) => {
				setAttributes({
					aspect: value
				});
			}}
			__next40pxDefaultSize
			__nextHasNoMarginBottom
        >
            <ToggleGroupControlOption value="none" label="None" />
            <ToggleGroupControlOption value="3-2" label="3:2" />
            <ToggleGroupControlOption value="16-9" label="16:9" />
            <ToggleGroupControlOption value="1-1" label="1:1" />
            <ToggleGroupControlOption value="24-1" label="2.4:1" />
        </ToggleGroupControl>
		<p
		class="block-editor-hooks__layout-constrained-helptext"
		style={{marginBlockEnd:'1rem'}}
		>Crop the image to preserve an aspect ratio.</p>
		</>
    );
	}

	const focalPointPicker = () => {
		if( ! attributes.asset.url ) {
			return null;
		}
		return (
		<>
		<FocalPointPicker
			__nextHasNoMarginBottom
			label={__("Focal point")}
			url={attributes.asset.url}
			value={attributes.focalPoint}
			onChange={( value ) => {
				setAttributes({
					focalPoint: value
				});
			}}
		/>
		<p
		class="block-editor-hooks__layout-constrained-helptext"
		style={{marginBlockEnd:'1rem'}}
		>Choose the part of the image to keep in view when it's cropped.</p>
		</>
	);
	}

	const calculateClassName = () => {
		let c = ['flair-wrapper flair-overlay-wrapper'];
		c.push( 'aspect-' + attributes.aspect );
		return c.join(' ');
	}

	const mediaElement = () => {
		let s = blockIsSelected();
		if( attributes.asset.url ) {
			return (
				<figure class="media">
					<img
					src={attributes.asset.url}
					alt={attributes.asset.alt} />
				</figure>
			);
		} else {
			if( s ) {
				return (
					<></>
				);
			}
		}

		return null;

	}

	const setOverlayColor = (v, t) => {
		// onColorChange and onGradientChange fire back to back, so each time, one of these will be undefined.
		if( undefined == v ) {
			return;
		}
		setAttributes( { overlayColor: v } )
	}

	const Heading = `${attributes.heading}`;

	const styles = {
		'--overlay-color' : attributes.overlayColor,
		'--overlay-opacity' : attributes.overlayOpacity,
		'--flair-focal-point' : focalPointToPosition( attributes.focalPoint )
	}

	const blockProps = useBlockProps( {
		className: calculateClassName(),
		style: styles
	} );

	return (
		<>
		<BlockControls>
			<MediaReplaceFlow
			mediaID={attributes.asset.id}
			mediaURL={attributes.asset.url}
			onSelect={onSelectMedia}
			allowedTypes={['image', 'video']}
			value={attributes.asset.id}
			accept="image/*,video/*"
			name={!attributes.asset.url ? __('Add Media', 'flair') : __('Replace Media', 'flair')}
			children={
				(<Button
				className="components-toolbar__control flair-remove-button"
				onClick={() => {
					setAttributes({
						asset: {
							alt: null,
							id: null,
							url: null,
						},
					});
				}}
				>Remove</Button>)
			}
			/>
			{linkPopover()}
		</BlockControls>

		<InspectorControls group="color">
			<ColorGradientSettingsDropdown
				panelId={ props.clientId }
				settings={ [
					{
						label: 'Overlay',
						hasColorsOrGradients: true,
						disableCustomColors: false,
						colorValue: attributes.overlayColor,
						onColorChange: ( color ) => setOverlayColor( color, 'color' ),
						onGradientChange: ( color ) => setOverlayColor( color, 'gradient' )
					}
				] }
				{ ...useMultipleOriginColorsAndGradients() }
			/>
			<RangeControl
				__next40pxDefaultSize
				__nextHasNoMarginBottom
				className="flair-full-grid"
				help="Select transparency for the overlay color."
				value={attributes.overlayOpacity*1}
				label="Opacity"
				max={100}
				min={0}
				onChange={( value ) => {
					console.log(value);
					setAttributes({
						overlayOpacity: value + ""
					});
				}}
			/>
		</InspectorControls>


		<InspectorControls>
			<PanelBody>
				<PanelRow><fieldset>{headingLevelToggles()}</fieldset></PanelRow>
				<PanelRow><fieldset>{aspectRatioToggles()}</fieldset></PanelRow>
				{focalPointPicker()}
			</PanelBody>
		</InspectorControls>
		<div { ...blockProps }>
			<div class="flair-overlay">
				<div class="text">
					{ (attributes.eyebrow || isSelected) && (
					<RichText
						tagName='div'
						className='flair-eyebrow'
						placeholder={__('Eyebrow', 'flair')}
						value={attributes.eyebrow}
						allowedFormats={[ 'core/bold', 'core/italic', 'core/subscript', 'core/superscript', 'core/strikethrough' ]}
						onChange={( value ) => {
							setAttributes({
								eyebrow: value
							});
						}}
					/>
					)
					}
					<Heading class="title">
						<RichText
							tagName='a'
							className='link'
							placeholder={__('My overlay', 'flair')}
							value={attributes.title}
							allowedFormats={[ 'core/bold', 'core/italic', 'core/subscript', 'core/superscript', 'core/strikethrough' ]}
							onChange={( value ) => {
								setAttributes({
									title: value
								});
							}}
						/>
					</Heading>
					{ (InnerBlocks.Content || isSelected) && (
						<InnerBlocks defaultBlock={['core/paragraph', {placeholder: "Lorem ipsum..."}]} directInsert />
					)}
				</div>
				<div class="overlay"
					data-overlay-color={attributes.overlayColor}
					data-overlay-opacity={attributes.overlayOpacity}
				></div>
				{ mediaElement() }
			</div>
		</div>
		</>
	);
}
