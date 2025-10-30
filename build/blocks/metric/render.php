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

$classes = ['flair-metric'];
if( isset( $attributes['orientation'] ) ) {
	$classes[] = 'orientation-' . $attributes['orientation'] ;
}
//  echo '<pre>', print_r($attributes, TRUE), '</pre>';

?>
<div class="flair-wrapper flair-metric-wrapper">
	<div <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes)]); ?>>  
		<em><?php echo $attributes['number']; ?></em>
		<span class="qualifier"><?php echo $attributes['qualifier']; ?></span>
	</div>
</div>