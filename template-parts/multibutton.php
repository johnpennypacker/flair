<?php

	// args isn't always set, if it isn't, use the defaults
	$attributes = $args['attributes'];

	$classes = ['flair-multibutton'];
	if( isset( $attributes['orientation'] ) ) {
		$classes[] = 'orientation-' . $attributes['orientation'] ;
	}

?>

	<div <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes)]); ?>>

		<div class="dropdown">
			<div class="select">
				<a href="#" class="action button"> </a>
				<button aria-expanded="false" aria-haspopup="true" class="dropdown-toggle"><span>Other options</span></button>
			</div>
			<div class="options" tab-index="0">
				<?php echo $args['content']; ?>
			</div>
		</div>
	</div>
