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
<<?php echo $wrapper_element; ?> <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes) ?? NULL ]); ?> <?php if ( 'a' === $wrapper_element ) echo ' href="' . esc_url( $attributes['href'] ) . '"'; ?>">
	<div class="flair-metric flair-io">
		<em><?php echo esc_html( $attributes['number'] ); ?></em>
		<span class="qualifier"><?php echo esc_html( $attributes['qualifier'] ); ?></span>
		<?php if( isset( $attributes['attribution'] ) ): ?>
		<small class="attribution"><?php echo esc_html( $attributes['attribution'] ); ?></small>
		<?php endif; ?>
	</div>
</<?php echo $wrapper_element; ?>>
