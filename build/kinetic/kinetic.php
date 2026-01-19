<?php
/**
 *
 */

/**
 * Add the kinetic stylesheet.
 */
function flair_kinetic_enqueues() {
	$asset = include FLAIR_PATH . 'build/flair-core/flair.asset.php';
	wp_enqueue_style( 'flair-kinetic', FLAIR_URL . 'build/kinetic/kinetic-styles.css', [], $asset['version'] );
}
add_action( 'wp_enqueue_scripts', 'flair_kinetic_enqueues' );

/**
 * Enqueue Editor assets.
 */
function flair_kinetic_editor_enqueues() {
	flair_kinetic_enqueues();
}
add_action( 'enqueue_block_assets', 'flair_kinetic_editor_enqueues' );

