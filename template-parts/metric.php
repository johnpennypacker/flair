<?php

$attributes = $args['attributes'];

$classes = ['flair-metric'];
if( isset( $attributes['orientation'] ) ) {
	$classes[] = 'orientation-' . $attributes['orientation'] ;
}
//  echo '<pre>', print_r($attributes, TRUE), '</pre>';

?>
<div class="flair-wrapper flair-metric-wrapper">
	<div <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes)]); ?>>
		<em><?php echo $attributes['number']; ?></em>
		<span class="qualifier"><?php echo $attributes['qualifier']; ?></span>
	</div>
</div>
