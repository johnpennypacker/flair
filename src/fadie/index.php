<?php
/**
 *
 */


/**
 * Add the fadie script and stylesheet.
 */
function flair_fadie_enqueues( $block_content='', $block=[] ) {
	if ( isset( $block['attrs']['className'] ) && FALSE !== strpos( $block['attrs']['className'], 'flair-fadie' ) ) {

		$css = file_get_contents( FLAIR_PATH . 'build/fadie/frontend.css' );
		if ( $css ) {
			wp_add_inline_style( 'flair', $css );
		}

	}
	return $block_content;
}
add_action( 'render_block_core/cover', 'flair_fadie_enqueues', 10, 2 );

/**
 * Enqueue editor assets.
 */
function flair_fadie_editor_enqueues() {
	if ( ! is_admin() ) {
		return;
	}
	$asset = include FLAIR_PATH . 'build/fadie/variation.asset.php';
	wp_enqueue_script( 'flair-fadie-variation', FLAIR_URL . 'build/fadie/variation.js', array_merge($asset['dependencies'], ['wp-hooks', 'wp-blocks']), $asset['version'] );

	flair_fadie_enqueues();

	$asset = include FLAIR_PATH . 'build/fadie/variation.asset.php';
	wp_enqueue_style( 'flair-fadie-editor', FLAIR_URL . 'build/fadie/editor.css', [], $asset['version'] );
}
add_action( 'enqueue_block_assets', 'flair_fadie_editor_enqueues' );
