<?php

$attributes = $args['attributes'];


$classes = ['flair-milestone'];
if( isset( $attributes['marker'] ) ) {
	$classes[] = 'marker-' . $attributes['marker'] ;
}

// echo '<pre>', print_r($content, TRUE), '</pre>';

?>
<div class="flair-wrapper flair-milestone-wrapper">
	<div <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes)]); ?>>
		<div class="timeline"></div>
		<div class="details">
			<div class="date"><?php echo $attributes['date']; ?></div>
			<?php echo $args['content']; ?>
		</div>
	</div>
</div>
