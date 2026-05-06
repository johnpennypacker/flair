<?php

$attributes = $args['attributes'];


$classes = ['flair-eyebrow'];
// if( isset( $attributes['marker'] ) ) {
// 	$classes[] = 'marker-' . $attributes['marker'] ;
// }

// echo '<pre>', print_r($content, TRUE), '</pre>';

$element = 'div';
if( ! empty ( $attributes['element'] ) ) {
	$element = $attributes['element'];
}

$el = in_array( $attributes['element'] ?? 'div', ['aside','div','p','h1','h2','h3','h4','h5','h6'], true ) ? $attributes['element'] : 'div';


if ( ! empty( $attributes['content'] ) ):
?>
<<?php echo $element ?> <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes)]); ?>>
	<?php echo esc_html( $attributes['content'] ); ?>
</<?php echo $element ?>>
<?php endif; ?>
