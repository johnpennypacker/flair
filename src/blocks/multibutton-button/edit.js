/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */

import { useState } from 'react';

import { __ } from '@wordpress/i18n';

import {
	BlockControls,
	ButtonBlockAppender,
	InnerBlocks,
	InspectorControls,
	LinkControl,
	RichText
} from '@wordpress/block-editor';

import {
	Button,
	Popover,
	ToolbarButton,
	__experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption
} from '@wordpress/components';
import {
	link,
	linkOff
} from '@wordpress/icons';
import {
	createBlock
} from '@wordpress/blocks';



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
	let c = ['flair-multibutton-button dropdown-item'];
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
				<RichText
				tagName='div'
				className=''
				disableLineBreaks='true'
				placeholder={__('link text')}
				value={ attributes.text }
				allowedFormats={[ 'core/bold', 'core/italic', 'core/subscript', 'core/superscript' ]}
				onChange={( value ) => {
					setAttributes({
						text: value
					});
				}}
				__unstableOnSplitAtEnd={ () =>
					props.insertBlocksAfter(
						createBlock( 'flair/multibutton-button' )
					)
				}
				/>
			</div>
		</>
	);

}
