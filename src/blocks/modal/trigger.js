/**
 * Adds an "Opens a modal" control to core/button.
 *
 * This is an authoring convenience and nothing more: all it does is write a
 * fragment href (`#contact`) into the button's own `url` attribute, which is the
 * whole trigger contract (see view.js). Nothing downstream depends on this file
 * having run — a hand-typed fragment works identically — so there is no custom
 * attribute on core/button and therefore no block-validation risk.
 *
 * Scope: the dropdown lists modals in the post currently being edited.
 * getBlocksByName() reads the current editor's block tree, so a modal living in
 * a template part or a synced pattern is invisible to it even though it works
 * perfectly well at runtime. The free-text field below covers those cases.
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls, store as blockEditorStore } from '@wordpress/block-editor';
import { PanelBody, PanelRow, SelectControl, TextControl } from '@wordpress/components';
import { useSelect, select as dataSelect, dispatch as dataDispatch, subscribe } from '@wordpress/data';
import domReady from '@wordpress/dom-ready';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { sanitizeModalId } from './edit';

const CUSTOM = 'flair-custom-modal-id';

function ModalTriggerPanel( { attributes, setAttributes } ) {
	const { url } = attributes;

	const modals = useSelect( ( select ) => {
		const { getBlocksByName, getBlock } = select( blockEditorStore );

		if ( ! getBlocksByName ) {
			return [];
		}

		return getBlocksByName( 'flair/modal' )
			.map( ( clientId ) => {
				const { modalId, label } = getBlock( clientId )?.attributes ?? {};
				return { id: modalId ?? '', label: label || modalId || '' };
			} )
			.filter( ( modal ) => modal.id );
	}, [] );

	// A button is a modal trigger when its URL is a bare fragment.
	const currentId = url && url.startsWith( '#' ) ? url.slice( 1 ) : '';
	const isKnown = modals.some( ( modal ) => modal.id === currentId );

	// Whether the free-text field is showing. It can't be derived from the URL
	// alone, because choosing the option is itself the thing that reveals the
	// field to type an ID into, and until then there is no URL to read.
	const [ isCustom, setIsCustom ] = useState( false );

	// An ID that no modal in this post accounts for was typed by hand, or points
	// at a template part — either way the free-text field is the one that fits it.
	useEffect( () => {
		if ( currentId && ! isKnown ) {
			setIsCustom( true );
		}
	}, [ currentId, isKnown ] );

	const setModal = ( id ) => {
		setAttributes( { url: id ? `#${ id }` : undefined } );
	};

	const options = [
		{ value: '', label: __( '— None —', 'flair' ) },
		...modals.map( ( modal ) => ( { value: modal.id, label: modal.label } ) ),
		{ value: CUSTOM, label: __( 'A modal elsewhere on the page…', 'flair' ) }
	];

	const selected = isCustom ? CUSTOM : currentId;

	return (
		<InspectorControls>
			<PanelBody
				title={ __( 'Modal', 'flair' ) }
				initialOpen={ !! currentId }
			>
				<PanelRow>
					<SelectControl
						label={ __( 'Opens a modal', 'flair' ) }
						help={ modals.length
							? __( 'Modals in this post. Clicking the button opens the one you pick instead of following its link.', 'flair' )
							: __( 'No modal blocks in this post yet. Add one, or point this button at a modal elsewhere on the page.', 'flair' )
						}
						value={ selected }
						options={ options }
						onChange={ ( value ) => {
							if ( CUSTOM === value ) {
								setIsCustom( true );
								return;
							}
							setIsCustom( false );
							setModal( value );
						} }
						__next40pxDefaultSize
						__nextHasNoMarginBottom
					/>
				</PanelRow>
				{ isCustom && (
					<PanelRow>
						<TextControl
							label={ __( 'Modal ID', 'flair' ) }
							help={ __( 'For a modal that lives in a template part or a synced pattern, type its ID here.', 'flair' ) }
							value={ currentId }
							onChange={ ( value ) => {
								setModal( sanitizeModalId( value ) );
							} }
							__next40pxDefaultSize
							__nextHasNoMarginBottom
						/>
					</PanelRow>
				) }
			</PanelBody>
		</InspectorControls>
	);
}

const withModalTrigger = createHigherOrderComponent( ( BlockEdit ) => ( props ) => (
	<>
		<BlockEdit { ...props } />
		{ 'core/button' === props.name && <ModalTriggerPanel { ...props } /> }
	</>
), 'withModalTrigger' );

addFilter( 'editor.BlockEdit', 'flair/modal-trigger', withModalTrigger );

/**
 * Puts the post's modals into the link picker's suggestions.
 *
 * The inspector control above is only reachable once you already know to look
 * for it. The link popover — the chain icon on a button, or Cmd-K on a
 * selection — is where an author actually goes to point something somewhere, so
 * modals need to turn up there, listed alongside pages and posts.
 *
 * Core builds those suggestions from the `__experimentalFetchLinkSuggestions`
 * editor setting and exposes no filter for it, so the only way in is to wrap the
 * function the editor installed and prepend our own results. Being experimental,
 * it is treated as optional throughout: if the setting ever disappears or is
 * renamed, nothing here runs and the fragment-href contract is unaffected.
 *
 * This benefits every link UI at once, not just core/button — inline links in a
 * paragraph, and flair's own link-bearing blocks, all read the same setting.
 */

const WRAPPED = '__flairModalSuggestions';

/**
 * The modals in this post that match what the author has typed so far, shaped
 * the way LinkControl expects a suggestion to look.
 */
function modalSuggestions( search ) {
	const { getBlocksByName, getBlock } = dataSelect( blockEditorStore );

	if ( ! getBlocksByName ) {
		return [];
	}

	// Someone typing a URL is not looking for a modal.
	if ( /^(https?:)?\/\//i.test( search ) ) {
		return [];
	}

	// An author looking for a modal may well type the leading # of the fragment.
	const term = ( search || '' ).replace( /^#/, '' ).toLowerCase();

	return getBlocksByName( 'flair/modal' )
		.map( ( clientId ) => getBlock( clientId )?.attributes ?? {} )
		.filter( ( { modalId } ) => modalId )
		.filter( ( { modalId, label } ) =>
			! term ||
			modalId.toLowerCase().includes( term ) ||
			( label || '' ).toLowerCase().includes( term )
		)
		.map( ( { modalId, label } ) => ( {
			id: `flair-modal-${ modalId }`,
			url: `#${ modalId }`,
			title: label || modalId,
			type: __( 'Modal', 'flair' ),
			kind: 'flair-modal'
		} ) );
}

function wrapFetchLinkSuggestions( original ) {
	const wrapped = async ( search, ...rest ) => {
		let suggestions = [];

		// Core's own results still matter — a failure fetching them shouldn't
		// take the modal suggestions down with it.
		try {
			suggestions = ( await original( search, ...rest ) ) || [];
		} catch ( error ) {
			suggestions = [];
		}

		return [ ...modalSuggestions( search ), ...suggestions ];
	};

	wrapped[ WRAPPED ] = true;
	return wrapped;
}

function installLinkSuggestions() {
	const { __experimentalFetchLinkSuggestions: current } = dataSelect( blockEditorStore ).getSettings();

	// Nothing to wrap, or ours is already in place. The second case is what stops
	// the updateSettings() below from re-triggering this subscriber forever.
	if ( 'function' !== typeof current || current[ WRAPPED ] ) {
		return;
	}

	dataDispatch( blockEditorStore ).updateSettings( {
		__experimentalFetchLinkSuggestions: wrapFetchLinkSuggestions( current )
	} );
}

domReady( () => {
	installLinkSuggestions();

	// The editor replaces its settings wholesale in some flows (switching to a
	// template, opening a synced pattern), which would drop the wrapper.
	subscribe( installLinkSuggestions, blockEditorStore );
} );
