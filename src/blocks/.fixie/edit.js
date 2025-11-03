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
	BlockControls,
	InnerBlocks,
	InspectorControls,
    MediaPlaceholder,
	MediaReplaceFlow,
	RichText,
	useBlockProps
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

	const onSelectMedia = (media) => {
		setAttributes({
			asset: {
				alt: media.alt,
				id: media.id,
				url: media.url,
			},
		});
	};

	const defaultTemplate = () => {
		return [
			 [ 'core/group', {"layout":{"type":"flex","orientation":"vertical","verticalAlignment":"center"}}, [
				 [ 'core/heading', { level: 3, placeholder: "This fixie is going to be epic." } ],
				 [ 'core/paragraph', { "fontSize":"large", placeholder: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce elit dolor, bibendum vel risus eu, semper imperdiet justo."} ]
			 ]],
		];
	}

	const calculateClassName = () => {
		let c = ['flair-fixie'];
		// c.push( 'orientation-' + attributes.orientation );
		return c.join(' ');
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
		</BlockControls>

		<InspectorControls>
			<PanelBody title={ __( 'Fixie properties', 'flair' ) }>
				<PanelRow><fieldset></fieldset></PanelRow>
			</PanelBody>
		</InspectorControls>

		<div class="flair-wrapper flair-fixie-wrapper">
			<div { ...useBlockProps({ className:calculateClassName() }) }>  
				<div 
					className='background'
				>
					<div className='color-picker column-width'>
						colorpicker goes here
					</div>
				</div>
				<div 
					className='foreground'
				>
					<InnerBlocks
					template={defaultTemplate()}
					/>
				</div>
			</div>
		</div>
		</>
	);



}
