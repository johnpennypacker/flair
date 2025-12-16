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

?>
<div class="flair-wrapper flair-eyebrow-wrapper">
	<<?php echo $element ?> <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes)]); ?>>
		<?php echo $attributes['content']; ?>
	</<?php echo $element ?>>
</div>
