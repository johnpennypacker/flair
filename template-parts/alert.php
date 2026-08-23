<?php

$attributes = $args['attributes'];

$dismissible = ! empty( $attributes['dismissible'] );
$alert_id    = isset( $attributes['alertId'] ) ? $attributes['alertId'] : '';

// A stable per-block key for the dismissal cookie. Falls back to a hash of the
// saved content for hand-authored block markup that never passed through the
// editor (and so never picked up an alertId).
$safe_id = preg_replace( '/[^a-z0-9_-]/', '', strtolower( $alert_id ) );
if ( '' === $safe_id ) {
	$safe_id = substr( md5( $args['content'] ), 0, 12 );
}
$cookie_name = 'flair_alert_dismissed_' . $safe_id;

// The visitor already dismissed this alert: render nothing. Note this only
// works against uncached (or cookie-aware cached) requests — a full-page cache
// that ignores cookies will keep serving whichever state it captured.
if ( $dismissible && ! empty( $_COOKIE[ $cookie_name ] ) ) {
	return;
}

$classes = [ 'flair-alert-wrapper' ];
if ( $dismissible ) {
	$classes[] = 'is-dismissible';
}

$wrapper_attributes = [ 'class' => implode( ' ', $classes ) ];
if ( $dismissible ) {
	$wrapper_attributes['data-flair-alert-cookie'] = $cookie_name;
	$wrapper_attributes['data-flair-alert-days']   = '60';
}

?>
<div <?php echo get_block_wrapper_attributes( $wrapper_attributes ); ?>>
	<div class="flair-alert">
		<?php echo wp_kses_post( $args['content'] ); ?>
	</div>
	<?php if ( $dismissible ) : ?>
	<button class="flair-alert-close" type="button" aria-label="<?php esc_attr_e( 'Dismiss', 'flair' ); ?>">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
			<path fill="currentColor" d="M18.3,5.71a1,1,0,0,0-1.41,0L12,10.59,7.11,5.7A1,1,0,0,0,5.7,7.11L10.59,12,5.7,16.89a1,1,0,1,0,1.41,1.41L12,13.41l4.89,4.89a1,1,0,0,0,1.41-1.41L13.41,12l4.89-4.89A1,1,0,0,0,18.3,5.71Z"/>
		</svg>
	</button>
	<?php endif; ?>
</div>
