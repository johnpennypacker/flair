/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { useEffect } from 'react';

import { __ } from '@wordpress/i18n';

import {
	InspectorControls,
	useInnerBlocksProps
} from '@wordpress/block-editor';

import {
	PanelBody,
	PanelRow,
	ToggleControl
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

const calculateClassName = ( attributes ) => {
	let c = [ 'flair-wrapper', 'flair-alert-wrapper' ];
	if ( attributes.dismissible ) {
		c.push( 'is-dismissible' );
	}
	return c.join( ' ' );
}

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
	const { dismissible, alertId } = attributes;

	// The dismissal cookie is keyed on this. It's assigned once, on insert, and
	// then lives in saved post content — unlike clientId, which is re-generated
	// every time the editor loads and can't be relied on to stay stable.
	useEffect( () => {
		if ( ! alertId ) {
			setAttributes( { alertId: `alert-${ clientId.slice( 0, 8 ) }` } );
		}
	}, [ alertId, clientId, setAttributes ] );

	// The inner blocks have to be direct children of the block wrapper: the
	// layout support puts its container class on the outermost element, and the
	// constrained-width CSS it generates only reaches that element's children.
	const innerBlocksProps = useInnerBlocksProps(
		useBlockProps( { className: calculateClassName( attributes ) } ),
		{
			defaultBlock: { name: 'core/paragraph', attributes: { placeholder: __( 'Lorem ipsum...', 'flair' ) } },
			directInsert: true,
		}
	);

	return (
		<>
		<InspectorControls>
			<PanelBody
				title={ __( 'Alert properties', 'flair' ) }
			>
				<PanelRow>
					<ToggleControl
						label={ __( 'Dismissible', 'flair' ) }
						help={ __( 'Adds a close button. Once dismissed, the visitor won’t see this alert again for 60 days.', 'flair' ) }
						checked={ !! dismissible }
						onChange={ ( value ) => {
							setAttributes( { dismissible: value } );
						} }
						__nextHasNoMarginBottom
					/>
				</PanelRow>
			</PanelBody>
		</InspectorControls>
		<div { ...innerBlocksProps }>
			{ innerBlocksProps.children }
			{ dismissible && (
				<button
					className="flair-alert-close"
					type="button"
					aria-label={ __( 'Dismiss', 'flair' ) }
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
						<path fill="currentColor" d="M18.3,5.71a1,1,0,0,0-1.41,0L12,10.59,7.11,5.7A1,1,0,0,0,5.7,7.11L10.59,12,5.7,16.89a1,1,0,1,0,1.41,1.41L12,13.41l4.89,4.89a1,1,0,0,0,1.41-1.41L13.41,12l4.89-4.89A1,1,0,0,0,18.3,5.71Z"/>
					</svg>
				</button>
			) }
		</div>
		</>
	);
}
