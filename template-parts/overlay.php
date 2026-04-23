<?php

$attributes = $args['attributes'];

$classes = ['flair-overlay-wrapper'];

if( isset( $attributes['aspect'] ) ) {
	$classes[] = 'aspect-' . $attributes['aspect'] ;
}

//  echo '<pre>', print_r($args, TRUE), '</pre>';

$overlay_properties  = 'style="';
if( ! empty( $attributes['overlayColor'] )) {
	$overlay_properties .= ' --overlay-color: ' . $attributes['overlayColor'] . '; ';
}
if( ! empty( $attributes['overlayOpacity'] )) {
	$overlay_properties .= ' --overlay-opacity: ' . $attributes['overlayOpacity'] . '; ';
}
$overlay_properties .= '"';

?>

<div <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes)]); ?>>
	<div class="flair-overlay">
		<div class="text">

			<?php if( ! empty( $attributes['eyebrow'] ) ): ?>
			<div class="flair-eyebrow"><?php echo $attributes['eyebrow']; ?></div>
			<?php endif; ?>

			<?php if( isset( $attributes['title'] ) && isset( $attributes['href'] ) ): ?>
			<<?php echo $attributes['heading'] ?> class="title">
				<a href="<?php echo $attributes['href']; ?>" class="link"><?php echo $attributes['title']; ?></a>
			</<?php echo $attributes['heading'] ?>>
			<?php else: ?>
				<div class="flair-warning"><p><strong>Warning:</strong> overlay is missing a title and link.</p></div>
			<?php endif; ?>

			<?php if( ! empty( $args['content'] ) ): ?>
			<div class="misc"><?php echo $args['content']; ?></div>
			<?php endif; ?>

		</div>
		<div class="overlay" <?php echo $overlay_properties; ?>></div>
		<div class="media">
			<?php if( ! empty( $attributes['asset']['url'] ) ): ?>
			<img src="<?php echo $attributes['asset']['url']; ?>" alt="<?php echo $attributes['asset']['alt']; ?>">
			<?php endif; ?>
		</div>
	</div>
</div>
