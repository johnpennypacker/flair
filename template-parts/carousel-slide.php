<?php

$attributes = $args['attributes'];
$classes = ['flair-carousel-slide slide'];

?>
<div <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes)]); ?>>
	<?php echo wp_kses_post( $args['content'] ); ?>
</div>
