<?php

$attributes = $args['attributes'];

$classes = ['flair-wrapper flair-boxout-wrapper'];
if( isset( $attributes['orientation'] ) ) {
	$classes[] = 'orientation-' . $attributes['orientation'] ;
}
//  echo '<pre>', print_r($attributes, TRUE), '</pre>';

$el = 'aside'; // the default;
if( isset( $attributes['element'] ) ) {
	$el = $attributes['element'];
}


?>
<<?php echo $el; ?> <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes)]); ?>>
	<div class="flair-boxout">
		<?php echo $args['content']; ?>
	</div>
</<?php echo $el; ?>>
