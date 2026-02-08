<?php

$attributes = $args['attributes'];

$classes = ['flair-layer'];
// if( isset( $attributes['orientation'] ) ) {
// 	$classes[] = 'orientation-' . $attributes['orientation'] ;
// }
//  echo '<pre>', print_r($attributes, TRUE), '</pre>';


?>
<div <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes)]); ?>>
	<?php echo $args['content']; ?>
</div>
