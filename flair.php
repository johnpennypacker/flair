<?php
/**
 * Plugin Name:       Flair
 * Description:       Fanciful add-ons.  Take two.
 * Version:           0.2.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            John Pennypacker
 * Text Domain:       flair
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

include_once( 'carousel/carousel.php' ); 

/**
 * Add the main flair script and stylesheet
 */
function flair_enqueus() {
	wp_enqueue_script( 'flair', plugins_url( 'flair.js', __FILE__ ), array() );
	wp_enqueue_style( 'flair', plugins_url( 'flair.css', __FILE__ ), array() );

	wp_enqueue_script( 'flair-zoomer', plugins_url( 'zoomer/zoomer.js', __FILE__ ), array() );
	wp_enqueue_style( 'flair-zoomer', plugins_url( 'zoomer/zoomer.css', __FILE__ ), array() );

	wp_enqueue_style( 'flair-iconic', plugins_url( 'iconic/iconic.css', __FILE__ ), array() );

}
add_action( 'wp_enqueue_scripts', 'flair_enqueus' );

/**
 * Enqueue Editor assets.
 */
function flair_enqueue_editor_assets() {
	wp_enqueue_style( 'flair-editor-carousel', plugins_url( 'carousel/editor.css', __FILE__ ), array() );
	wp_enqueue_style( 'flair-iconic', plugins_url( 'iconic/iconic.css', __FILE__ ), array() );
	wp_enqueue_script( 'flair-editor', plugins_url( 'flair-editor.js', __FILE__ ), array('wp-hooks'), strtotime('now'), array( 'in_footer' => true, 'strategy'  => 'defer') );
}
add_action( 'enqueue_block_assets', 'flair_enqueue_editor_assets' );


/**
 * Registers the block using a `blocks-manifest.php` file, which improves the performance of block type registration.
 * Behind the scenes, it also registers all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function flair_blocks_init() {
	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
	 * based on the registered block metadata.
	 * Added in WordPress 6.8 to simplify the block metadata registration process added in WordPress 6.7.
	 *
	 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
	 */
	if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
		wp_register_block_types_from_metadata_collection( __DIR__ . '/build/blocks', __DIR__ . '/build/blocks-manifest.php' );
		return;
	}

	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` file.
	 * Added to WordPress 6.7 to improve the performance of block type registration.
	 *
	 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
	 */
	if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
		wp_register_block_metadata_collection( __DIR__ . '/build/blocks', __DIR__ . '/build/blocks-manifest.php' );
	}
	/**
	 * Registers the block type(s) in the `blocks-manifest.php` file.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
	foreach ( array_keys( $manifest_data ) as $block_type ) {
		register_block_type( __DIR__ . "/build/blocks/{$block_type}" );
	}
}
add_action( 'init', 'flair_blocks_init' );


function flair_add_block_category( $categories ) {
	$flair_category = array(
		array(
			'slug'  => 'flair',
			'title' => __( 'Flair', 'flair' ),
			'icon'  => null,
		),
	);

	return array_merge( $categories, $flair_category );
}
add_filter( 'block_categories_all', 'flair_add_block_category', 10, 2 );

// @todo: consolidate js and css https://developer.wordpress.org/news/2024/09/how-to-build-a-multi-block-plugin/