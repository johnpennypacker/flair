<?php
/**
 *
 */


/**
 * Add the fixie script and stylesheet.
 */
<<<<<<< HEAD
function flair_fixie_enqueues() {
	// wp_enqueue_script( 'flair-fixie', FLAIR_URL . 'src/fixie/fixie.js', array('wp-hooks'), '', array( 'in_footer' => true, 'strategy'  => 'defer') );

	$asset = include FLAIR_PATH . 'build/fixie/variation.asset.php';
	// wp_enqueue_style( 'flair-fixie', FLAIR_URL . 'build/fixie/frontend.css', [], $asset['version'] );
	wp_add_inline_style( 'flair', file_get_contents( FLAIR_PATH . 'build/fixie/frontend.css' ) );
=======
function flair_fixie_enqueues( $block_content, $block ) {
	if ( FALSE !== strpos( $block['attrs']['className'], 'flair-fixie' ) ) {
		$asset = include FLAIR_PATH . 'build/fixie/variation.asset.php';
		wp_enqueue_style( 'flair-fixie', FLAIR_URL . 'build/fixie/frontend.css', [], $asset['version'] );
	}
	return $block_content;
>>>>>>> b61bac2977a7c23d8b248b3b4f036ae0190da094
}
add_action( 'render_block_core/cover', 'flair_fixie_enqueues', 10, 2 );

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
