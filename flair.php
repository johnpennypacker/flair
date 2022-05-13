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
 * Add the main flair script
 */
function flair_script() {
	wp_enqueue_script( 'flair', plugins_url( 'flair.js', __FILE__ ), array() );
}
add_action( 'wp_enqueue_scripts', 'flair_script' );



/**
 * Register blocks.
 */
function flair_register_blocks() {


	$block = register_block_type( __DIR__ . '/sidler' );
	
	// for some reason, the block.json property for editorScript isn't working for me.
	wp_register_script(
		'flair-sidler-editor',
		plugins_url( 'sidler/editor.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element' )
	);
	$block->editor_script = 'flair-sidler-editor';

// 	echo '<pre>';
// 	var_dump( $block );
// 	echo '</pre>';
// 	exit;
}
add_action( 'init', 'flair_register_blocks' );

function flair_sidler_script() {
	wp_enqueue_script( 'flair-sidler', plugins_url( 'sidler/sidler.js', __FILE__ ), array() );
}
add_action( 'wp_enqueue_scripts', 'flair_sidler_script' );


