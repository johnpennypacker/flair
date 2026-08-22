/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { useEffect } from '@wordpress/element';

import { __, sprintf } from '@wordpress/i18n';

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps
} from '@wordpress/block-editor';

import {
	PanelBody,
	PanelRow,
	TextControl
} from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * Keeps an author-typed ID to what is legal in an `id` attribute and a URL
 * fragment. Mirrors flair_modal_id() in render.php — the two have to agree, or a
 * trigger written in the editor won't match the ID rendered on the front end.
 */
export const sanitizeModalId = ( value ) => value.replace( /[^A-Za-z0-9_-]/g, '' );

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( props ) {

	const { attributes, setAttributes, clientId } = props;
	const { modalId, label } = attributes;

	// Triggers address this modal by ID, so it is assigned once, on insert, and
	// then lives in saved post content — unlike clientId, which is re-generated
	// every time the editor loads and can't be relied on to stay stable.
	useEffect( () => {
		if ( ! modalId ) {
			setAttributes( { modalId: `modal-${ clientId.slice( 0, 8 ) }` } );
		}
	}, [ modalId, clientId, setAttributes ] );

	return (
		<>
		<InspectorControls>
			<PanelBody
				title={ __( 'Modal properties', 'flair' ) }
			>
				<PanelRow>
					<TextControl
						label={ __( 'Label', 'flair' ) }
						help={ __( 'Names the dialog for screen readers, and identifies this modal when picking one from a button.', 'flair' ) }
						value={ label || '' }
						onChange={ ( value ) => {
							setAttributes( { label: value } );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</PanelRow>
				<PanelRow>
					<TextControl
						label={ __( 'Modal ID', 'flair' ) }
						help={ modalId
							? sprintf(
								/* translators: %s: the URL fragment that opens this modal, e.g. #contact */
								__( 'Any link pointing at %s opens this modal. Changing it breaks links that already point here.', 'flair' ),
								`#${ modalId }`
							)
							: __( 'Any link pointing at this ID opens this modal.', 'flair' )
						}
						value={ modalId || '' }
						onChange={ ( value ) => {
							setAttributes( { modalId: sanitizeModalId( value ) } );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
		<div { ...useBlockProps( { className: 'flair-modal' } ) }>
			<div className="flair-modal-content">
				<InnerBlocks
					defaultBlock={ { name: 'core/paragraph', attributes: { placeholder: __( 'Modal content…', 'flair' ) } } }
					directInsert
				/>
			</div>
		</div>
		</>
	);
}
