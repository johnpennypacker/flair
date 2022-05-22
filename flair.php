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

}
add_action( 'wp_enqueue_scripts', 'flair_enqueus' );


include_once 'card/index.php';


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




function fc_pattern() {
	register_block_pattern(
		'flair/card-pattern',
		array(
			'title' => __( 'Card pattern', 'jape' ),
			'description' => _x( 'My great description goes here.', 'Block pattern description', 'flair' ),
			'content'     => '<!-- wp:group {"className":"card"} -->
<div class="wp-block-group card"><!-- wp:image {"id":75,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="http://wordpress.test/wp-content/uploads/2022/03/oriole-1024x768.jpg" alt="an oriole" class="wp-image-75"/></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2>My header</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>My excerpt text.</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->',
		)
	);
}
add_action( 'init', 'fc_pattern' );