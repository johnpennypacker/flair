<?php

$attributes = $args['attributes'];

?>
<div <?php echo get_block_wrapper_attributes(['class' => 'sidler flair-io']); ?>>
	<div class="line"><?php echo $attributes['content']; ?></div>
</div>
