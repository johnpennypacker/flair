<?php

$attributes = $args['attributes'];

$classes = ['flair-wrapper flair-metric-wrapper'];
if( isset( $attributes['orientation'] ) ) {
	$classes[] = 'orientation-' . $attributes['orientation'] ;
}
if( isset( $attributes['href'] ) ) {
	$classes[] = 'is-linked';
}
//  echo '<pre>', print_r($attributes, TRUE), '</pre>';

$wrapper_element = ( isset( $attributes['href'] ) ) ? 'a' : 'div';

?>
<<?php echo $wrapper_element; ?> <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes), 'href' => ( $attributes['href'] ) ?? NULL ]); ?>>
	<div class="flair-metric flair-io">
		<em><?php echo $attributes['number']; ?></em>
		<span class="qualifier"><?php echo $attributes['qualifier']; ?></span>
	</div>
</<?php echo $wrapper_element; ?>>
