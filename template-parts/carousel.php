<?php

$attributes = $args['attributes'];
$classes = ['flair-carousel-wrapper'];
if( ! empty( $attributes['showArrows'] ) ) {
	$classes[] = 'has-arrows';
}
if( ! empty( $attributes['showDots'] ) ) {
	$classes[] = 'has-dots';
}

switch( $attributes['perpage'] ?? 1 ) {
	case 3:
		$classes[] = 'triple';
		break;
	case 2:
		$classes[] = 'double';
		break;
	default:
		$classes[] = 'single';
		break;
}
?>
<div <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes)]); ?>>
	<div class="flair-carousel">
		<?php echo wp_kses_post( $args['content'] ); ?>
	</div>
</div>
