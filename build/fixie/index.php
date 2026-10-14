<?php
/**
 *
 */


/**
 * Add the fixie script and stylesheet.
 */
function flair_fixie_enqueues( $block_content='', $block=[] ) {
	if ( isset( $block['attrs']['className'] ) && FALSE !== strpos( $block['attrs']['className'], 'flair-fixie' ) ) {

		$css = file_get_contents( FLAIR_PATH . 'build/fixie/frontend.css' );
		if ( $css ) {
			wp_add_inline_style( 'flair', $css );
		}

		$block_content = flair_fixie_add_io( $block_content );

	}
	return $block_content;
}

/**
 * Opt an older fixie in to flair.js's scroll data.
 *
 * Fixies inserted now carry `flair-io` in their saved class list (see
 * variation.js). Ones saved before that don't, and their fade needs it.
 *
 * @todo Remove once existing fixies have been re-saved with `flair-io`, along
 *       with the call above.
 *
 * @param string $block_content Rendered cover.
 * @return string
 */
function flair_fixie_add_io( $block_content ) {
	$tags = new WP_HTML_Tag_Processor( $block_content );
	if ( $tags->next_tag() ) {
		$tags->add_class( 'flair-io' );
		$block_content = $tags->get_updated_html();
	}
	return $block_content;
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
