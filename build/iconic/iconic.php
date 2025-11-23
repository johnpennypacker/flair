<?php
/**
 * 
 */

/**
 * Add the iconic stylesheet.
 */
function flair_iconic_enqueues() {
	wp_enqueue_style( 'flair-iconic', plugins_url( 'iconic.css', __FILE__ ), array() );
}
add_action( 'wp_enqueue_scripts', 'flair_iconic_enqueues' );

/**
 * Enqueue Editor assets.
 */
function flair_iconic_editor_enqueues() {
	wp_enqueue_style( 'flair-iconic-editor', plugins_url( 'iconic.css', __FILE__ ), array() );
}
add_action( 'enqueue_block_assets', 'flair_iconic_editor_enqueues' );

