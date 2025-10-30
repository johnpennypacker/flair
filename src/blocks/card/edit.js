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
	Popover,
	ToolbarButton,
	__experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption
} from "@wordpress/components";
import { displayShortcut, isKeyboardEvent, ENTER } from '@wordpress/keycodes';
import { link, linkOff } from '@wordpress/icons';
import { useSelect } from '@wordpress/data';

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

	function startEditing( event ) {
		event.preventDefault();
		setIsEditingURL( true );
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
					// forceIsEditingLink={ isEditingURL }
					// settings={ LINK_SETTINGS }
					// createSuggestion={
					// 	createPageEntity && handleCreate
					// }
					// withCreateSuggestion={ userCanCreatePages }
					// createSuggestionButtonText={ createButtonText }
				/>
					
				</Popover> }
			</ToolbarButton>
		);
	
	}

	const orientationToggles = () => {
		return (
        <ToggleGroupControl
            label={__("Orientation")}
            value="auto"
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
    );
	}


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
					title={ __( 'Card orientation', 'flair' ) }
				>
					{orientationToggles()}
				</PanelBody>
			</InspectorControls>
		<div class="flair-card-wrapper">
			<div { ...useBlockProps({ className:'flair-card'}) }>  
				<div class="text">
					<h2 class="title">
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
					</h2>
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
