<?php
/**
 *
 */

// Block direct requests
if ( !defined('ABSPATH') )
	die('-1');

/**
 * Register blocks.
 */
function flair_register_card_block() {


	$block = register_block_type( __DIR__ );
	
	// for some reason, the block.json property for editorScript isn't working for me.
	wp_register_script(
		'flair-card-editor',
		plugins_url( 'editor.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element' )
	);
	$block->editor_script = 'flair-card-editor';

// 	echo '<pre>';
// 	var_dump( $block );
// 	echo '</pre>';
// 	exit;
}
add_action( 'init', 'flair_register_card_block' );