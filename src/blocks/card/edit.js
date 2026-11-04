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
	RichText,
	store as blockEditorStore,
	useInnerBlocksProps
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
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

import { PostSourceToggle, usePostSource } from '../../shared/post-source';

/**
 * What a new card starts with: the excerpt, attribution and button it used to
 * have as fields, now as paragraphs carrying the same classes, so they're
 * styled as before. Empty ones aren't shown on the front end, as empty fields
 * weren't, so an author only fills in what they want. Each is named for its
 * job, so the List View tells them apart. `index.js` turns an older card's
 * fields into these same paragraphs.
 */
const TEMPLATE = [
	[ 'core/paragraph', { className: 'excerpt', placeholder: __( 'The body of my great card', 'flair' ), metadata: { name: __( 'Paragraph - excerpt', 'flair' ) } } ],
	[ 'core/paragraph', { className: 'attribution', placeholder: __( 'Anonymous', 'flair' ), metadata: { name: __( 'Paragraph - attribution', 'flair' ) } } ],
	[ 'core/paragraph', { className: 'button', placeholder: __( 'Explore', 'flair' ), metadata: { name: __( 'Paragraph - button', 'flair' ) } } ],
];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit(props) {

	const { attributes, setAttributes, isSelected, context } = props;

	// What to show: the typed content, or the current post's.
	const post = usePostSource( attributes, context );

	// Empty paragraphs aren't shown on the front end, so they're hidden here
	// too until the card, or something in it, is selected -- then their
	// placeholders show what can be filled in. See editor.scss.
	const isEditingBody = useSelect(
		( select ) => isSelected || select( blockEditorStore ).hasSelectedInnerBlock( props.clientId, true ),
		[ isSelected, props.clientId ]
	);

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

		// The post supplies the link. Hooks above still run, to keep their order.
		if( post.isPostSource ) {
			return null;
		}

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
		let c = ['flair-wrapper flair-card-wrapper'];
		c.push( 'aspect-' + attributes.aspect );
		c.push( 'orientation-' + attributes.orientation );
		if( isEditingBody ) {
			c.push( 'is-editing-body' );
		}
		return c.join(' ');
	}

	const mediaElement = () => {
		let s = blockIsSelected();
		if( post.asset.url ) {
			return (
				<figure class="media">
					<img
					src={post.asset.url}
					alt={post.asset.alt} />
				</figure>
			);
		} else {
			if( s ) {
				return (
					<MediaPlaceholder
					onSelect={onSelectMedia}
					allowedTypes={['image']}
					/>
				);
			}
		}

		return null;

	}

	const Heading = `${attributes.heading}`;

	// The body is inner blocks, laid straight into `.text` after the title --
	// no wrapper, since the card's styles size and space `.text`'s children.
	const { children: innerBlocks, ...textProps } = useInnerBlocksProps(
		{ className: 'text' },
		{ template: TEMPLATE }
	);

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
				<PanelRow><fieldset>
					<PostSourceToggle
						attributes={attributes}
						setAttributes={setAttributes}
						help={__( "Use the current post for cards in Query Loops, it'll show the title, link and featured image of each post.", 'flair' )}
					/>
				</fieldset></PanelRow>
				<PanelRow><fieldset>{orientationToggles()}</fieldset></PanelRow>
				<PanelRow><fieldset>{headingLevelToggles()}</fieldset></PanelRow>
				<PanelRow><fieldset>{aspectRatioToggles()}</fieldset></PanelRow>
			</PanelBody>
		</InspectorControls>
		<div { ...useBlockProps({ className:calculateClassName() }) }>
			<div class="flair-card">
				<div { ...textProps }>

					<Heading class="title">
						{ post.isPostSource ? (
						<a className='link'>{ post.title || __( 'Post title', 'flair' ) }</a>
						) : (
						<RichText
							tagName='a'
							className='link'
							placeholder={__('My card')}
							value={attributes.title}
							allowedFormats={[ 'core/bold', 'core/italic', 'core/subscript', 'core/superscript', 'core/strikethrough' ]}
							onChange={( value ) => {
								setAttributes({
									title: value
								});
							}}
						/>
						) }
					</Heading>
					{ innerBlocks }

				</div>
				{ mediaElement() }
			</div>
		</div>
		</>
	);
}
