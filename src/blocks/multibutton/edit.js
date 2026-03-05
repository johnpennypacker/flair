/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import {
	ButtonBlockAppender,
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
	let c = ['flair-wrapper flair-multibutton'];
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

	const MULTIBUTTON_TEMPLATE = [
		[ 'flair/multibutton-button', {} ],
		[ 'flair/multibutton-button', {} ],
		[ 'flair/multibutton-button', {} ]
	];

	return (
		<>
			<div { ...useBlockProps({ className:calculateClassName() }) }>
				<p class="label">I am a: </p>
				<div class="dropdown">
					<div class="options shown">
						<InnerBlocks
							template={ MULTIBUTTON_TEMPLATE }
							templateLock={false}
						/>
						<ButtonBlockAppender rootClientId={ props.clientId } />
					</div>
				</div>
			</div>
		</>
	);


}
