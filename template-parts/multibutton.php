<?php

	// args isn't always set, if it isn't, use the defaults
	$attributes = $args['attributes'];

	$classes = ['flair-wrapper flair-multibutton'];
	if( isset( $attributes['orientation'] ) ) {
		$classes[] = 'orientation-' . $attributes['orientation'] ;
	}

?>

	<div <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes)]); ?>>

		<p class="label">I am a:</p>

		<div class="dropdown">
			<a aria-expanded="false" aria-haspopup="true" class="button dropdown-toggle" href="#"> </a>
			<div class="options" tab-index="0">
				<?php echo $args['content']; ?>
			</div>
		</div>
	</div>
