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

$el = in_array( $attributes['element'] ?? 'aside', ['aside','div','section'], true ) ? $attributes['element'] : 'aside';


?>
<<?php echo $el; ?> <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes)]); ?>>
	<div class="flair-boxout is-layout-constrained">
		<?php echo wp_kses_post( $args['content'] ); ?>
	</div>
</<?php echo $el; ?>>
