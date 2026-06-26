<?php

$attributes = $args['attributes'];

$classes = ['flair-overlay-wrapper'];

if( isset( $attributes['aspect'] ) ) {
	$classes[] = 'aspect-' . $attributes['aspect'] ;
}

//  echo '<pre>', print_r($args, TRUE), '</pre>';

$overlay_properties  = 'style="';
if( ! empty( $attributes['overlayColor'] )) {
	$overlay_properties .= ' --overlay-color: ' . esc_attr( $attributes['overlayColor'] ) . '; ';
}
if( ! empty( $attributes['overlayOpacity'] )) {
	$overlay_properties .= ' --overlay-opacity: ' . esc_attr( $attributes['overlayOpacity'] ) . '; ';
}
$overlay_properties .= '"';

$heading = in_array( $attributes['heading'] ?? 'h3', ['h1','h2','h3','h4','h5','h6'], true ) ? $attributes['heading'] : 'h3';

?>

<div <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes)]); ?>>
	<div class="flair-overlay">
		<div class="text">

			<?php if( ! empty( $attributes['eyebrow'] ) ): ?>
			<div class="flair-eyebrow"><?php echo esc_html( $attributes['eyebrow'] ); ?></div>
			<?php endif; ?>

			<?php if( isset( $attributes['title'] ) && isset( $attributes['href'] ) ): ?>
			<<?php echo $heading ?> class="title">
				<a href="<?php echo esc_url( $attributes['href'] ); ?>" class="link"><?php echo esc_html( $attributes['title'] ); ?></a>
			</<?php echo $heading ?>>
			<?php else: ?>
				<div class="flair-warning"><p><strong>Warning:</strong> overlay is missing a title and link.</p></div>
			<?php endif; ?>

			<?php if( ! empty( $args['content'] ) ): ?>
			<div class="misc"><?php echo wp_kses_post( $args['content'] ); ?></div>
			<?php endif; ?>

		</div>
		<div class="overlay" <?php echo $overlay_properties; ?>></div>
		<div class="media">
			<?php if( ! empty( $attributes['asset']['url'] ) ): ?>
			<img src="<?php echo esc_attr( $attributes['asset']['url'] ); ?>" alt="<?php echo esc_attr( $attributes['asset']['alt'] ?? '' ); ?>">
			<?php endif; ?>
		</div>
	</div>
</div>
