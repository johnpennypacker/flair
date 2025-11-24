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

$classes = ['flair-eyebrow'];
// if( isset( $attributes['marker'] ) ) {
// 	$classes[] = 'marker-' . $attributes['marker'] ;
// }

// echo '<pre>', print_r($content, TRUE), '</pre>';

?>
<div class="flair-wrapper flair-eyebrow-wrapper">
	<div <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes)]); ?>>
		<?php echo $attributes['content']; ?>
	</div>
</div>
