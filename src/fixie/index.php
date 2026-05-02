<?php
/**
 *
 */


/**
 * Add the fixie script and stylesheet.
 */
function flair_fixie_enqueues() {
	// wp_enqueue_script( 'flair-fixie', FLAIR_URL . 'src/fixie/fixie.js', array('wp-hooks'), '', array( 'in_footer' => true, 'strategy'  => 'defer') );

	$asset = include FLAIR_PATH . 'build/fixie/variation.asset.php';
	wp_enqueue_style( 'flair-fixie', FLAIR_URL . 'build/fixie/frontend.css', [], $asset['version'] );
}
add_action( 'wp_enqueue_scripts', 'flair_fixie_enqueues' );

// function flair_fixie_enqueues() {
//
// 	$asset = include FLAIR_PATH . 'build/fixie/variation.asset.php';
// 	wp_enqueue_block_style( 'core/cover', array(
// 		'handle' => 'flair-fixie',
// 		'src' => FLAIR_URL . 'build/fixie/frontend.css',
// 		'path' => FLAIR_PATH . 'build/fixie/frontend.css',
// 		'deps' => $asset['dependencies'],
// 		'ver' => $asset['version'],
// 	));
// }
// add_action( 'after_setup_theme', 'flair_fixie_enqueues' );


/**
 * Enqueue editor assets.
 */
function flair_fixie_editor_enqueues() {
	if ( ! is_admin() ) {
		return;
	}
	$asset = include FLAIR_PATH . 'build/fixie/variation.asset.php';
	wp_enqueue_script( 'flair-fixie-variation', FLAIR_URL . 'build/fixie/variation.js', array_merge($asset['dependencies'], ['wp-hooks', 'wp-blocks']), $asset['version'] );

	flair_fixie_enqueues();

	$asset = include FLAIR_PATH . 'build/fixie/variation.asset.php';
	wp_enqueue_style( 'flair-fixie-editor', FLAIR_URL . 'build/fixie/editor.css', [], $asset['version'] );
}
add_action( 'enqueue_block_assets', 'flair_fixie_editor_enqueues' );
