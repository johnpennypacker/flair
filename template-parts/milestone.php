<?php

$attributes = $args['attributes'];


$classes = ['flair-milestone-wrapper'];
if( isset( $attributes['marker'] ) ) {
	$classes[] = 'marker-' . $attributes['marker'] ;
}
if( isset( $attributes['layout'] ) ) {
	$classes[] = 'layout-' . $attributes['layout'] ;
}

// echo '<pre>', print_r($content, TRUE), '</pre>';

?>
<div <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes)]); ?>>
	<div class="flair-milestone">
		<div class="timeline"></div>
		<div class="details">
			<div class="date flair-eyebrow"><?php echo esc_attr( $attributes['date'] ); ?></div>
			<?php echo ( $args['content'] ); ?>
		</div>
	</div>
</div>
