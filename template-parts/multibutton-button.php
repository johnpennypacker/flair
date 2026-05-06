<?php

	// args isn't always set, if it isn't, use the defaults
	$attributes = $args['attributes'];

?>

<?php if( isset( $attributes['text'] ) ): ?>
<a class="dropdown-item" tab-index="-1" href="<?php echo esc_attr( $attributes['href'] ); ?>"><?php echo esc_html( $attributes['text'] ); ?></a>
<?php endif; ?>
