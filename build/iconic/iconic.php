<?php
/**
 *
 */

/**
 * Register the iconic stylesheet so it can be enqueued on demand.
 */
function flair_iconic_register() {
	$asset = include FLAIR_PATH . 'build/flair-core/flair-editor.asset.php';
	wp_register_style( 'flair-iconic', FLAIR_URL . 'build/iconic/iconic.css', [], $asset['version'] );
}
add_action( 'init', 'flair_iconic_register' );

/**
 * Enqueue the iconic stylesheet only for blocks that opt in via the
 * `iconic` CSS class. Runs for every rendered block, but the enqueue is
 * a no-op after the first match.
 *
 * @param str $block_content the rendered block markup
 * @param arr $block         the parsed block
 * @return str the unchanged block markup
 */
function flair_iconic_maybe_enqueue( $block_content, $block ) {
	if ( isset( $block['attrs']['className'] ) && FALSE !== strpos( $block['attrs']['className'], 'iconic' ) ) {
		wp_enqueue_style( 'flair-iconic' );
	}
	return $block_content;
}
add_filter( 'render_block', 'flair_iconic_maybe_enqueue', 10, 2 );

/**
 * In the editor, load the iconic styles unconditionally so the icons
 * preview correctly while editing.
 */
function flair_iconic_editor_enqueues() {
	if ( ! is_admin() ) {
		return;
	}
	wp_enqueue_style( 'flair-iconic' );
}
add_action( 'enqueue_block_assets', 'flair_iconic_editor_enqueues' );
