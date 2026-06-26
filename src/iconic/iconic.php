<?php
/**
 *
 */

/**
 * Add the iconic stylesheet.
 */
function flair_iconic_enqueues() {
	$css = file_get_contents( FLAIR_PATH . 'build/iconic/iconic.css' );
	if ( $css ) {
		wp_add_inline_style( 'flair', $css );
	}
}
add_action( 'wp_enqueue_scripts', 'flair_iconic_enqueues' );

/**
 * Enqueue Editor assets.
 */
function flair_iconic_editor_enqueues() {
	if ( ! is_admin() ) {
		return;
	}
	flair_iconic_enqueues();
}
add_action( 'enqueue_block_assets', 'flair_iconic_editor_enqueues' );

