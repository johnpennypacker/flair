<?php

$attributes = $args['attributes'];


$classes = ['flair-wrapper flair-eyebrow-wrapper'];
// if( isset( $attributes['marker'] ) ) {
// 	$classes[] = 'marker-' . $attributes['marker'] ;
// }

// echo '<pre>', print_r($content, TRUE), '</pre>';

$element = 'div';
if( ! empty ( $attributes['element'] ) ) {
	$element = $attributes['element'];
}

if ( ! empty( $attributes['content'] ) ):
?>
<div <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes)]); ?>>
	<<?php echo $element ?> class="flair-eyebrow">
		<?php echo $attributes['content']; ?>
	</<?php echo $element ?>>
</div>
<?php endif; ?>
