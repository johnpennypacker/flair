<?php

$attributes = $args['attributes'];
$classes = ['flair-carousel-slide slide'];

?>
<div <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes)]); ?>>
	<div class="flair-carousel-slide slide">
		<?php echo $args['content']; ?>
	</div>
</div>
