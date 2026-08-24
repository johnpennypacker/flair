<?php

	// args isn't always set, if it isn't, use the defaults
	$attributes = $args['attributes'];

	// get_block_wrapper_attributes() is what carries the block's supports --
	// its background colour, text colour and text alignment -- onto the
	// element. Without it those controls appear in the editor and do nothing
	// on the front end.
	$wrapper_attributes = get_block_wrapper_attributes( [ 'class' => 'flair-multibutton-button dropdown-item' ] );

?>

<?php if( isset( $attributes['text'] ) ): ?>
<a <?php echo $wrapper_attributes; ?> tab-index="-1" href="<?php echo esc_url( $attributes['href'] ?? '#' ); ?>"><?php echo esc_html( $attributes['text'] ); ?></a>
<?php endif; ?>
