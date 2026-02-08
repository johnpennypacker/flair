<?php

$attributes = $args['attributes'];

$classes = ['flair-wrapper flair-stack-wrapper'];
if( isset( $attributes['orientation'] ) ) {
	$classes[] = 'orientation-' . $attributes['orientation'] ;
}
//  echo '<pre>', print_r($attributes, TRUE), '</pre>';


?>
<div <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes)]); ?>>
	<div class="flair-stack">
		<?php echo $args['content']; ?>
	</div>
</div>
<div>&nbsp;</div>