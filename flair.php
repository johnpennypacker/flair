<?php
/**
 * Plugin Name:       Flair
 * Description:       Spices jape up a bit
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            John Pennypacker
 * Text Domain:       jape
 */

// Block direct requests
if ( !defined('ABSPATH') )
	die('-1');

/**
 * Add the main flair script and stylesheet
 */
function flair_enqueus() {
	wp_enqueue_script( 'flair', plugins_url( 'flair.js', __FILE__ ), array() );
	wp_enqueue_style( 'flair', plugins_url( 'flair.css', __FILE__ ), array() );

	wp_enqueue_script( 'flair-carousel', plugins_url( 'carousel/carousel.js', __FILE__ ), array() );
	wp_enqueue_style( 'flair-carousel', plugins_url( 'carousel/carousel.css', __FILE__ ), array() );

	wp_enqueue_style( 'flair-iconic', plugins_url( 'iconic/iconic.css', __FILE__ ), array() );

}
add_action( 'wp_enqueue_scripts', 'flair_enqueus' );


/**
 * Register blocks.
 */
function flair_register_blocks() {

	register_block_type( __DIR__ . '/accordion' );
	register_block_type( __DIR__ . '/card' );
	register_block_type( __DIR__ . '/eyebrow' );
	register_block_type( __DIR__ . '/milestone' );
	register_block_type( __DIR__ . '/sidebar' );
	register_block_type( __DIR__ . '/sidler' );

}
add_action( 'init', 'flair_register_blocks' );