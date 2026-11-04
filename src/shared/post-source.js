/**
 * Editor side of `source: post`, shared by the card and the overlay.
 *
 * Blocks set to use the current post show that post's title, link and
 * featured image instead of what was typed into them; blocks inside them get
 * the same post from context, for anything else. The post comes from block
 * context, so in a Query Loop each copy previews its own post.
 * `flair_post_source_attributes()` in flair.php
 * does the same on the front end, and the two should agree on what wins.
 */

import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
import { store as coreStore, useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';

/**
 * Rendered post fields are HTML with entities; the blocks show plain text,
 * as their templates escape whatever they're given.
 *
 * @param {?string} html Rendered markup.
 * @return {string} Its text.
 */
const toText = ( html ) => {
	if( ! html ) {
		return '';
	}
	const doc = new window.DOMParser().parseFromString( html, 'text/html' );
	return ( doc.body.textContent || '' ).trim();
};

/**
 * The values a block should display, from the post when it's set to use one.
 *
 * Post values only replace typed ones when the post has them, so the block's
 * own image still shows for a post without a featured image.
 *
 * @param {Object} attributes Block attributes.
 * @param {Object} context    Block context, carrying postId and postType.
 * @return {Object} isPostSource, plus the title, href and asset to show.
 */
export function usePostSource( attributes, context ) {

	const { postId, postType } = context || {};
	const isPostSource = 'post' === attributes.source && !! postId;

	const [ , , fullTitle ] = useEntityProp( 'postType', postType, 'title', postId );
	const [ link ] = useEntityProp( 'postType', postType, 'link', postId );
	const [ featuredId ] = useEntityProp( 'postType', postType, 'featured_media', postId );

	const media = useSelect(
		( select ) => ( isPostSource && featuredId )
			? select( coreStore ).getMedia( featuredId, { context: 'view' } )
			: null,
		[ isPostSource, featuredId ]
	);

	if( ! isPostSource ) {
		return {
			isPostSource,
			title: attributes.title,
			href: attributes.href,
			asset: attributes.asset,
		};
	}

	return {
		isPostSource,
		title: toText( fullTitle?.rendered ?? fullTitle?.raw ),
		href: link,
		asset: media ? {
			id: media.id,
			url: media.media_details?.sizes?.large?.source_url ?? media.source_url,
			alt: media.alt_text,
		} : attributes.asset,
	};

}

/**
 * The inspector switch between typed content and the current post.
 *
 * @param {Object} props
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Block attribute setter.
 * @param {string}   props.help          What the post fills in, for the help text.
 * @return {Element} The control.
 */
export function PostSourceToggle( { attributes, setAttributes, help } ) {
	return (
		<ToggleControl
			__nextHasNoMarginBottom
			label={ __( 'Use the current post', 'flair' ) }
			help={ help }
			checked={ 'post' === attributes.source }
			onChange={ ( value ) => {
				setAttributes( {
					source: value ? 'post' : 'manual'
				} );
			} }
		/>
	);
}
