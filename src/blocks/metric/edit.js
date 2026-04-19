import { useState } from 'react';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import {
	BlockControls,
	LinkControl,
	RichText
} from '@wordpress/block-editor';

import {
	Button,
	Disabled,
	Popover,
	ToolbarButton,
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

	const calculateClassName = () => {
		let c = ['flair-wrapper flair-metric-wrapper'];
		if( isURLSet() ) { c.push('is-linked') }
		return c.join(' ');
	}

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


	return (
		<>
			<BlockControls>
				{linkPopover()}
			</BlockControls>
			<div { ...useBlockProps({ className:calculateClassName() }) }>
				<div class="flair-metric">
						<RichText
							tagName='em'
							className=''
							disableLineBreaks='true'
							placeholder={__('100%')}
							value={attributes.number}
							allowedFormats={[ 'core/bold', 'core/italic', 'core/subscript', 'core/superscript', 'core/strikethrough' ]}
							onChange={( value ) => {
								setAttributes({
									number: value
								});
							}}
						/>
						<RichText
							tagName='span'
							className='qualifier'
							disableLineBreaks='true'
							placeholder={__('Awesome')}
							value={attributes.qualifier}
							allowedFormats={[ 'core/bold', 'core/italic', 'core/subscript', 'core/superscript', 'core/strikethrough' ]}
							onChange={( value ) => {
								setAttributes({
									qualifier: value
								});
							}}
						/>
					{ (attributes.attribution || isSelected) && (
					<RichText
						tagName='small'
						className='attribution'
						placeholder={__('Source: ')}
						value={attributes.attribution}
						allowedFormats={[ 'core/bold', 'core/italic', 'core/subscript', 'core/superscript', 'core/strikethrough' ]}
						onChange={( value ) => {
							setAttributes({
								attribution: value
							});
						}}
					/>
					)
					}
				</div>
			</div>
		</>
	);


}
