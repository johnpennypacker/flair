<?php
/**
 * Entrance animations.
 *
 * An element animates in when it carries `data-flair-animate="<preset>"`.
 * Nothing else is animated, and `none` switches the animation off for that
 * element and everything inside it. The attribute arrives one of two ways:
 *
 * - From the block itself. Every block gets a `flairAnimation` attribute and an
 *   "Entrance animation" panel in the editor; `flair_entrance_render()` writes
 *   it onto the block's outer element at render time, so `save()` output never
 *   changes and no block is invalidated by it.
 * - From the site's defaults. `flair.js` applies the default preset to anything
 *   matching the default selectors that hasn't said otherwise. Filter
 *   `flair_animation_defaults` to change what animates without being asked.
 *
 * Timing lives in CSS custom properties, which a theme sets in theme.json under
 * `settings.custom.flair.animation` -- see THEMING.md.
 */


/**
 * The presets an author can pick, as name => label.
 *
 * Each name `x` is played by `@keyframes flair-entrance-x`. Flair ships the
 * five below; a theme adds one by filtering this list and defining the
 * matching keyframes.
 *
 * @return array
 */
function flair_animation_presets() {
	$presets = array(
		'fade' => __( 'Fade', 'flair' ),
		'rise' => __( 'Rise', 'flair' ),
		'zoom' => __( 'Zoom', 'flair' ),
		'wipe' => __( 'Wipe', 'flair' ),
		'blur' => __( 'Blur', 'flair' ),
	);
	$presets = apply_filters( 'flair_animation_presets', $presets );

	// Names end up in a keyframes name and an attribute selector.
	$clean = array();
	foreach ( (array) $presets as $name => $label ) {
		$name = sanitize_key( $name );
		if ( '' !== $name && 'none' !== $name ) {
			$clean[ $name ] = (string) $label;
		}
	}
	return $clean;
}


/**
 * What animates when nobody has said otherwise.
 *
 * `selectors` are matched on the front end, so they reach theme markup and
 * template output as well as blocks. Return an empty list to make entrance
 * animation purely opt-in. `preset` is what they get.
 *
 * The defaults reproduce what Flair animated before this was configurable.
 *
 * @return array { selectors: string[], preset: string }
 */
function flair_animation_defaults() {
	$defaults = array(
		'preset'    => 'rise',
		'selectors' => array(
			'.wp-block-cover:not(.flair-fixie):not(.flair-fadie)',
			'figure',
			'footer',
			'section',
			'.flair-io',
			'.wp-block-column',
			'.flair-overlay-wrapper',
			// A vertical stack's children reveal one after another.
			':is(section, footer).wp-block-group.is-vertical > *',
		),
	);
	$config = apply_filters( 'flair_animation_defaults', $defaults );

	$presets = flair_animation_presets();
	$preset  = isset( $config['preset'] ) ? sanitize_key( $config['preset'] ) : '';
	if ( ! isset( $presets[ $preset ] ) ) {
		$preset = isset( $presets[ $defaults['preset'] ] ) ? $defaults['preset'] : (string) key( $presets );
	}

	$selectors = isset( $config['selectors'] ) ? array_values( array_filter( array_map( 'strval', (array) $config['selectors'] ) ) ) : array();

	return array(
		'preset'    => $preset,
		'selectors' => $selectors,
	);
}


/**
 * Hand the defaults to flair.js.
 *
 * Runs after `flair_enqueues()` registers the handle. An inline script ahead of
 * a deferred one is still fine; only an `after` script would force it to block.
 */
function flair_entrance_config() {
	wp_add_inline_script(
		'flair',
		'window.flairAnimation = ' . wp_json_encode( flair_animation_defaults() ) . ';',
		'before'
	);
}
add_action( 'wp_enqueue_scripts', 'flair_entrance_config', 20 );


/**
 * Declare the attribute on every block registered in PHP.
 *
 * Without it, a block rendered through the REST API (ServerSideRender) rejects
 * the unknown attribute. Blocks registered only in JS get it from editor.js.
 *
 * @param array $args Block type arguments.
 * @return array
 */
function flair_entrance_block_args( $args ) {
	if ( ! isset( $args['attributes'] ) || ! is_array( $args['attributes'] ) ) {
		$args['attributes'] = array();
	}
	if ( ! isset( $args['attributes']['flairAnimation'] ) ) {
		$args['attributes']['flairAnimation'] = array( 'type' => 'string' );
	}
	return $args;
}
add_filter( 'register_block_type_args', 'flair_entrance_block_args' );


/**
 * Write the block's choice onto its outer element.
 *
 * @param string $block_content Rendered block.
 * @param array  $block         Parsed block.
 * @return string
 */
function flair_entrance_render( $block_content, $block ) {
	if ( empty( $block['attrs']['flairAnimation'] ) || '' === trim( $block_content ) ) {
		return $block_content;
	}

	$value = sanitize_key( $block['attrs']['flairAnimation'] );
	if ( 'none' !== $value && ! array_key_exists( $value, flair_animation_presets() ) ) {
		return $block_content;
	}

	$tags = new WP_HTML_Tag_Processor( $block_content );
	if ( $tags->next_tag() ) {
		$tags->set_attribute( 'data-flair-animate', $value );
		$block_content = $tags->get_updated_html();
	}
	return $block_content;
}
add_filter( 'render_block', 'flair_entrance_render', 10, 2 );


/**
 * The editor panel.
 *
 * `enqueue_block_editor_assets` only fires in the editor, so the block-editor
 * dependencies never reach the front end.
 */
function flair_entrance_editor_enqueues() {
	$asset = include FLAIR_PATH . 'build/entrance/editor.asset.php';
	wp_enqueue_script( 'flair-entrance-editor', FLAIR_URL . 'build/entrance/editor.js', $asset['dependencies'], $asset['version'], true );
	wp_add_inline_script(
		'flair-entrance-editor',
		'window.flairAnimationPresets = ' . wp_json_encode( flair_animation_presets() ) . ';',
		'before'
	);
	wp_set_script_translations( 'flair-entrance-editor', 'flair' );
}
add_action( 'enqueue_block_editor_assets', 'flair_entrance_editor_enqueues' );
