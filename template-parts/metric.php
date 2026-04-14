<?php

$attributes = $args['attributes'];

$classes = ['flair-wrapper flair-metric-wrapper'];
if( isset( $attributes['orientation'] ) ) {
	$classes[] = 'orientation-' . $attributes['orientation'] ;
}
//  echo '<pre>', print_r($attributes, TRUE), '</pre>';

?>
<div <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes)]); ?>>
	<div class="flair-metric flair-io">
		<em><?php echo $attributes['number']; ?></em>
		<span class="qualifier"><?php echo $attributes['qualifier']; ?></span>
	</div>
</div>
