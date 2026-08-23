/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */

import { __ } from '@wordpress/i18n';

import {
	InspectorControls,
	store as blockEditorStore,
	useInnerBlocksProps
} from '@wordpress/block-editor';

import {
	PanelBody,
	PanelRow,
	ToggleControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption
} from '@wordpress/components';

import {
	useSelect
} from '@wordpress/data';



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

const CAROUSEL_TEMPLATE = [
	[ 'flair/carousel-slide', {} ],
	[ 'flair/carousel-slide', {} ],
	[ 'flair/carousel-slide', {} ]
];

/**
 * The same classes template-parts/carousel.php writes, so the front end's
 * style.scss dresses the editor preview too and editor.scss stays nearly empty.
 * Keep the two in step: this is the only reason the arrows and dots below need
 * no styling of their own.
 */
const calculateClassName = ( attributes ) => {
	let c = [ 'flair-carousel-wrapper' ];
	if ( attributes.showArrows ) {
		c.push( 'has-arrows' );
	}
	if ( attributes.showDots ) {
		c.push( 'has-dots' );
	}
	switch ( attributes.perpage ) {
		case '3':
			c.push( 'triple' );
			break;
		case '2':
			c.push( 'double' );
			break;
		default:
			c.push( 'single' );
			break;
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
export default function Edit(props) {

	const { attributes, setAttributes, clientId } = props;
	const { perpage, showArrows, showDots } = attributes;

	const slideCount = useSelect(
		( select ) => select( blockEditorStore ).getBlockCount( clientId ),
		[ clientId ]
	);

	// An estimate, deliberately. view.js counts pages by measuring where the
	// carousel can actually scroll to, which also folds in the narrow-width
	// downgrade and drops a final page that clamps onto the one before it.
	// Neither is knowable from an editor canvas that isn't the visitor's
	// viewport, so a carousel whose last page is short may preview one dot more
	// than it ships with. The preview answers "dots, and roughly how many" —
	// that is what the toggle is asking about.
	const pageCount = Math.max( 1, Math.ceil( slideCount / ( parseInt( perpage, 10 ) || 1 ) ) );

	const perPageToggles = () => {
		return (
		<>
        <ToggleGroupControl
            label={__("Slides per page", "flair")}
            value={attributes.perpage}
			onChange={( value ) => {
				setAttributes({
					perpage: value
				});
			}}
			__next40pxDefaultSize
			__nextHasNoMarginBottom
        >
            <ToggleGroupControlOption value="1" label={__("One", "flair")} />
            <ToggleGroupControlOption value="2" label={__("Two", "flair")} />
            <ToggleGroupControlOption value="3" label={__("Three", "flair")} />
        </ToggleGroupControl>
		<p
		class="block-editor-hooks__layout-constrained-helptext"
		style={{marginBlockEnd:'1rem'}}
		>Number of slides to show per screen — space permitting.</p>
		</>
    );
	}

	// The wrapper and the scroller are separate elements on the front end, and
	// every arrow/dot rule is scoped to the wrapper, so the editor needs both.
	// Safe to nest here because this block sets `supports.layout` to null —
	// nothing is relying on the inner blocks being children of the outermost
	// element the way the alert block's constrained layout does.
	const blockProps = useBlockProps( { className: calculateClassName( attributes ) } );
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'flair-carousel' },
		{
			allowedBlocks: [ 'flair/carousel-slide' ],
			orientation: 'horizontal',
			template: CAROUSEL_TEMPLATE,
			templateLock: false
		}
	);

	return (
		<>
		<InspectorControls>
			<PanelBody
				title={ __( 'Carousel properties', 'flair' ) }
			>
				<PanelRow>
						<ToggleControl
							label="Show Arrow Buttons"
							checked={attributes.showArrows}
							onChange={ (value) => {
								setAttributes({
									showArrows: value
								});
							}}
							__nextHasNoMarginBottom
						/>
				</PanelRow>
				<PanelRow>
						<ToggleControl
							label="Show Dots"
							checked={attributes.showDots}
							onChange={ (value) => {
								setAttributes({
									showDots: value
								});
							}}
							__nextHasNoMarginBottom
						/>
				</PanelRow>
				<PanelRow><fieldset>{perPageToggles()}</fieldset></PanelRow>
			</PanelBody>
		</InspectorControls>

			<div { ...blockProps }>
				<div { ...innerBlocksProps } />

				{ /* A picture of the controls view.js builds on the front end,
				     in the same DOM order it appends them, showing the first
				     page the way a visitor would find it. Inert: these are
				     inside the block, so a real button here would swallow the
				     click that selects it. */ }
				{ showArrows && (
					<>
						<button
							type="button"
							className="previous disabled"
							aria-hidden="true"
							tabIndex={ -1 }
						/>
						<button
							type="button"
							className={ pageCount > 1 ? 'next' : 'next disabled' }
							aria-hidden="true"
							tabIndex={ -1 }
						/>
					</>
				) }

				{ showDots && (
					<div className="dots" aria-hidden="true">
						{ Array.from( { length: pageCount }, ( _, i ) => (
							<button
								key={ i }
								type="button"
								className="dot"
								data-is-selected={ i === 0 ? '1' : '0' }
								tabIndex={ -1 }
							/>
						) ) }
					</div>
				) }
			</div>
		</>
	);

}
