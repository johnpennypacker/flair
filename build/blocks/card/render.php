<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$classes = ['flair-card'];
if( isset( $attributes['orientation'] ) ) {
	$classes[] = 'orientation-' . $attributes['orientation'] ;
}
if( isset( $attributes['aspect'] ) ) {
	$classes[] = 'aspect-' . $attributes['aspect'] ;
}

//  echo '<pre>', print_r($attributes, TRUE), '</pre>';

?>
<div class="flair-card-wrapper">
	<div <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes)]); ?>>
		<div class="text">
			<<?php echo $attributes['heading'] ?> class="title">
				<a href="<?php echo $attributes['href']; ?>" class="link"><?php echo $attributes['title']; ?></a>
			</<?php echo $attributes['heading'] ?>>
			<?php if( ! empty( $attributes['excerpt'] ) ): ?>
			<p class="excerpt"><?php echo $attributes['excerpt']; ?></p>
			<?php endif; ?>
			<?php if( ! empty( trim( $attributes['attribution'] ) ) ): ?>
			<small class="attribution"><?php echo $attributes['attribution']; ?></small>
			<?php endif; ?>
		</div>
		<div class="media">
			<?php if( ! empty( $attributes['asset']['url'] ) ): ?>
			<img src="<?php echo $attributes['asset']['url']; ?>" alt="<?php echo $attributes['asset']['alt']; ?>">
			<?php endif; ?>
		</div>
	</div>
</div>
