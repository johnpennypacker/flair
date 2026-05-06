<?php

$attributes = $args['attributes'];

?>
<div <?php echo get_block_wrapper_attributes(['class' => 'sidler flair-io']); ?>>
	<div class="line"><?php echo wp_kses_post( $attributes['content'] ); ?></div>
</div>
