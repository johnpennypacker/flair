<?php

	// args isn't always set, if it isn't, use the defaults
	$attributes = $args['attributes'];

	$classes = ['flair-multibutton'];
	if( isset( $attributes['orientation'] ) ) {
		$classes[] = 'orientation-' . $attributes['orientation'] ;
	}
	if( isset( $attributes['width'] ) ) {
		$classes[] = 'flair-width-' . str_replace( "%", "", $attributes['width'] );
	}

?>

	<div <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes)]); ?>>

		<div class="dropdown">
			<div class="select">
				<button aria-expanded="false" aria-haspopup="true" class="dropdown-toggle"><span>Select an action</span></button>
				<a href="#" class="action button"> </a>
			</div>
			<div class="options" tab-index="0">
				<?php echo wp_kses_post( $args['content'] ); ?>
			</div>
		</div>
	</div>
