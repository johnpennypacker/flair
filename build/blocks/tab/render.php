<?php

if ( ! function_exists( 'flair_tab_anchor' ) ) {
	/**
	 * Derives the panel ID for a tab from its attributes.
	 * Used by both the tabs and tab templates so the tab list
	 * hrefs always match the panel IDs.
	 *
	 * Inner blocks render before their parent, so this is also defined
	 * (and guarded) in the tabs block's render.php.
	 *
	 * @param arr $attributes the tab block attributes
	 * @return str the ID, or an empty string (view.js generates one at enhance time)
	 */
	function flair_tab_anchor( $attributes ) {
		if ( ! empty( $attributes['anchor'] ) ) {
			return $attributes['anchor'];
		}
		if ( ! empty( $attributes['label'] ) ) {
			return sanitize_title( $attributes['label'] );
		}
		return '';
	}
}

	$template_name = 'tab';

	flair_use_template( $template_name, $attributes, $block, $content );
