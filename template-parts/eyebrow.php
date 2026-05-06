<?php

$attributes = $args['attributes'];


$classes = ['flair-eyebrow'];
// if( isset( $attributes['marker'] ) ) {
// 	$classes[] = 'marker-' . $attributes['marker'] ;
// }

// echo '<pre>', print_r($content, TRUE), '</pre>';

$el = in_array( $attributes['element'] ?? 'div', ['div','aside','p','h1','h2','h3','h4','h5','h6'], true ) ? $attributes['element'] ?? 'div' : 'div';

if ( ! empty( $attributes['content'] ) ):
?>
<<?php echo $el ?> <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes)]); ?>>
	<?php echo wp_kses_post( $attributes['content'] ); ?>
</<?php echo $el ?>>
<?php endif; ?>
