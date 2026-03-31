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
	RichText
} from '@wordpress/block-editor';
import {
	Button,
	Disabled,
	PanelBody,
	PanelRow,
	Popover,
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

	const Heading = `${attributes.heading}`;

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

		<InspectorControls>
			<PanelBody
				title={ __( 'Overlay properties', 'flair' ) }
			>
				<PanelRow><fieldset>{headingLevelToggles()}</fieldset></PanelRow>
				<PanelRow><fieldset>{aspectRatioToggles()}</fieldset></PanelRow>
			</PanelBody>
		</InspectorControls>
		<div { ...useBlockProps({ className:calculateClassName() }) }>
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
				{ mediaElement() }
			</div>
		</div>
		</>
	);
}
