<?php
/**
 * Plugin Name:       Flair
 * Description:       Fanciful additions to WordPress.
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

	wp_enqueue_script( 'flair-zoomer', plugins_url( 'zoomer/zoomer.js', __FILE__ ), array() );
	wp_enqueue_style( 'flair-zoomer', plugins_url( 'zoomer/zoomer.css', __FILE__ ), array() );

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
	register_block_type( __DIR__ . '/fixie' );
	register_block_type( __DIR__ . '/hero' );
	register_block_type( __DIR__ . '/metric' );
	register_block_type( __DIR__ . '/milestone' );
	register_block_type( __DIR__ . '/sidebar' );
	register_block_type( __DIR__ . '/sidler' );

}
add_action( 'init', 'flair_register_blocks' );


/**
 * Enqueue Editor assets.
 */
function flair_enqueue_editor_assets() {
	wp_enqueue_style( 'flair-editor-carousel', plugins_url( 'carousel/editor.css', __FILE__ ), array() );
	wp_enqueue_style( 'flair-iconic', plugins_url( 'iconic/iconic.css', __FILE__ ), array() );

	wp_enqueue_script( 'flair-editor', plugins_url( 'flair-editor.js', __FILE__ ), array() );
}
add_action( 'enqueue_block_editor_assets', 'flair_enqueue_editor_assets' );



// function flair_block_styles() {
// 	register_block_style(
// 		'core/columns',
// 		array(
// 			'name'         => 'flair-flairousel',
// 			'label'        => __( 'Carousel', 'flair' ),
// 			/*
// 			 * Styles for the custom Arrow icon style of the Details block
// 			 */
// 			'inline_style' => '
// 			.flair-flairousel {
// 			}
// 			.flair-flairousel .foo {
// 				list-style-type: "\2192\00a0\00a0\00a0";
// 			}',
// 		)
// 	);
// }
// 
// add_action( 'init', 'flair_block_styles' );
