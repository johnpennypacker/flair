<?php

$attributes = $args['attributes'];

$wrapper_args = [ 'class' => 'flair-tab' ];

// the ID is the HTML anchor if set, otherwise derived from the label;
// linking to it from anywhere reveals and focuses this tab
$id = flair_tab_anchor( $attributes );
if ( ! empty( $id ) ) {
	$wrapper_args['id'] = $id;
}

?>
<section <?php echo get_block_wrapper_attributes( $wrapper_args ); ?>>
	<?php if ( ! empty( $attributes['label'] ) ) : ?>
	<h3 class="flair-tab-label"><?php echo wp_kses_post( $attributes['label'] ); ?></h3>
	<?php endif; ?>
	<?php echo wp_kses_post( $args['content'] ); ?>
</section>
