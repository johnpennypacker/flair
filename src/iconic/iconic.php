<?php
/**
 *
 */

/**
 * Add the iconic stylesheet.
 */
function flair_iconic_enqueues() {
// 	$asset = include FLAIR_PATH . 'build/flair-core/flair.asset.php';
// 	wp_enqueue_style( 'flair-iconic', FLAIR_URL . 'build/iconic/iconic.css', [], $asset['version'] );
	wp_add_inline_style( 'flair', FLAIR_PATH . 'build/iconic/iconic.css' );
}
add_action( 'wp_enqueue_scripts', 'flair_iconic_enqueues' );

/**
 * Enqueue Editor assets.
 */
function flair_iconic_editor_enqueues() {
	flair_iconic_enqueues();
}
add_action( 'enqueue_block_assets', 'flair_iconic_editor_enqueues' );

