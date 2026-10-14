/**
 * The "Entrance animation" panel, on every block.
 *
 * Only the attribute lives here. entrance.php writes it onto the block's outer
 * element at render time, so nothing changes in saved markup.
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { hasBlockSupport } from '@wordpress/blocks';

const presets = window.flairAnimationPresets || {};

// A block that refuses a custom class has no wrapper an author can decorate,
// so there is nowhere for the attribute to go either.
function supportsAnimation( blockType ) {
	return hasBlockSupport( blockType, 'customClassName', true );
}

addFilter(
	'blocks.registerBlockType',
	'flair/entrance/attribute',
	( settings ) => {
		if (
			! supportsAnimation( settings ) ||
			settings.attributes?.flairAnimation
		) {
			return settings;
		}
		return {
			...settings,
			attributes: {
				...settings.attributes,
				flairAnimation: { type: 'string' },
			},
		};
	}
);

const options = [
	{ value: '', label: __( 'Site default', 'flair' ) },
	{ value: 'none', label: __( 'None', 'flair' ) },
	...Object.entries( presets ).map( ( [ value, label ] ) => ( {
		value,
		label,
	} ) ),
];

function helpFor( value ) {
	if ( 'none' === value ) {
		return __(
			'Nothing in this block animates in, including blocks inside it that would by default.',
			'flair'
		);
	}
	if ( 'wipe' === value ) {
		return __(
			'Wipe follows the scroll: it opens as the block comes up the screen, and closes again if you scroll back. Best on images and covers.',
			'flair'
		);
	}
	return __(
		'How this block appears as it scrolls into view. Site default leaves it to the theme.',
		'flair'
	);
}

const withEntrancePanel = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		const { name, attributes, setAttributes, isSelected } = props;
		if ( ! isSelected || ! supportsAnimation( name ) ) {
			return <BlockEdit { ...props } />;
		}
		const value = attributes.flairAnimation || '';
		return (
			<>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody
						title={ __( 'Entrance animation', 'flair' ) }
						initialOpen={ !! value }
					>
						<SelectControl
							__nextHasNoMarginBottom
							__next40pxDefaultSize
							label={ __( 'Animation', 'flair' ) }
							value={ value }
							options={ options }
							onChange={ ( next ) =>
								setAttributes( {
									flairAnimation: next || undefined,
								} )
							}
							help={ helpFor( value ) }
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	},
	'withEntrancePanel'
);

addFilter( 'editor.BlockEdit', 'flair/entrance/panel', withEntrancePanel );
