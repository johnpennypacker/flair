<?php

if ( ! function_exists( 'flair_modal_id' ) ) {
	/**
	 * Derives the ID a modal is addressed by.
	 *
	 * A modal is opened by a link whose href is a fragment pointing at this ID
	 * (`<a href="#contact">`), so the ID is the entire contract between a trigger
	 * and its modal — see template-parts/modal.php. The value is author-editable,
	 * so it is filtered down to characters that are safe in both an `id` attribute
	 * and a URL fragment.
	 *
	 * @param arr $attributes the modal block attributes
	 * @return str the ID, or an empty string when there is nothing usable
	 */
	function flair_modal_id( $attributes ) {
		$modal_id = isset( $attributes['modalId'] ) ? $attributes['modalId'] : '';
		return preg_replace( '/[^A-Za-z0-9_-]/', '', $modal_id );
	}
}

	$template_name = 'modal';

	flair_use_template( $template_name, $attributes, $block, $content );
