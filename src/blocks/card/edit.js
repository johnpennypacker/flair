/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */

import { useState } from 'react';

import { __ } from '@wordpress/i18n';

import {
	BlockControls,
	InspectorControls,
	LinkControl,
    MediaPlaceholder,
	MediaReplaceFlow,
	RichText
} from '@wordpress/block-editor';
import { 
	Button,
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
export default function Edit({ attributes, setAttributes }) {

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
		const [ isVisible, setIsVisible ] = useState( false );
		const toggleLink = () => {
			setIsVisible( ( state ) => ! state );
		};
		const unlink = () => {
			setAttributes({
				href: null,
			});
		}
		return (
			<ToolbarButton 
			onClick={ () => {
				if( ! isURLSet() ) {
					toggleLink();
				} else {
					unlink();
				}
			}}
			name="link"
			className={ ! isURLSet() ? '' : 'is-pressed' }
			icon={ ! isURLSet() ? link : linkOff }
			title={ ! isURLSet() ? __( 'Link' ) : __( 'Unlink' ) }
			>
				{ isVisible && <Popover>
					<LinkControl
					value={ {url:attributes.href} }
					onChange={ (value) => {
						setAttributes({
							href: value.url,
						});
					}}
					onRemove={ () => {
						setAttributes({
							href: null,
						});
					}}
					/>
				</Popover> }
			</ToolbarButton>
		);
	
	}

	const orientationToggles = () => {
		let help = 'Auto will usually display as vertical. When very wide, it will appear horizontal.'
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
		let c = ['flair-card'];
		c.push( 'aspect-' + attributes.aspect );
		c.push( 'orintation-' + attributes.orientation );
		return c.join(' ');
	}

	const Heading = `${attributes.heading}`;

	return (
		<>
		<BlockControls>
			<MediaReplaceFlow
			mediaID={attributes.asset.id}
			mediaURL={attributes.asset.url}
			onSelect={onSelectMedia}
			allowedTypes={['image']}
			value={attributes.asset.id}
			accept="image/*"
			name={!attributes.asset.url ? __('Add Image') : __('Replace Image')}
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
				title={ __( 'Card properties', 'flair' ) }
			>
				<PanelRow><fieldset>{orientationToggles()}</fieldset></PanelRow>
				<PanelRow><fieldset>{headingLevelToggles()}</fieldset></PanelRow>
				<PanelRow><fieldset>{aspectRatioToggles()}</fieldset></PanelRow>
			</PanelBody>
		</InspectorControls>
		<div class="flair-wrapper flair-card-wrapper">
			<div { ...useBlockProps({ className:calculateClassName() }) }>  
				<div class="text">
					<Heading class="title">
					<RichText
					{ ...useBlockProps() }
					tagName='a'
					className=''
					placeholder={__('My card')}
					value={attributes.title}
					allowedFormats={[ 'core/bold', 'core/italic', 'core/subscript', 'core/superscript', 'core/strikethrough' ]}
					onChange={( value ) => {
						setAttributes({ 
							title: value 
						});
					}}
					/>
					</Heading>
					<RichText
					{ ...useBlockProps() }
					tagName='p'
					className='excerpt'
					placeholder={__('The body of my great card')}
					value={attributes.excerpt}
					allowedFormats={[ 'core/bold', 'core/italic', 'core/subscript', 'core/superscript', 'core/strikethrough' ]}
					onChange={( value ) => {
						setAttributes({ 
							excerpt: value 
						});
					}}
					/>
					<RichText
					{ ...useBlockProps() }
					tagName='small'
					className='attribution'
					placeholder={__('Anonymous')}
					value={attributes.attribution}
					allowedFormats={[ 'core/bold', 'core/italic', 'core/subscript', 'core/superscript', 'core/strikethrough' ]}
					onChange={( value ) => {
						setAttributes({ 
							attribution: value 
						});
					}}
					/>
				</div>
				{attributes.asset.url ? (
					<figure class="media">
						<img src={attributes.asset.url}
						alt="" />
					</figure>
				) : (
				<MediaPlaceholder
				onSelect={onSelectMedia}
				allowedTypes={['image']}
				/>
				
				)}
			</div>
		</div>
		</>
	);
}
