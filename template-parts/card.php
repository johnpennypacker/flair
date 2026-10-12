<?php

$attributes = $args['attributes'];

$classes = ['flair-card-wrapper'];
if( isset( $attributes['orientation'] ) ) {
	$classes[] = 'orientation-' . $attributes['orientation'] ;
}
if( isset( $attributes['aspect'] ) ) {
	$classes[] = 'aspect-' . $attributes['aspect'] ;
}

$heading = in_array( $attributes['heading'] ?? 'h3', ['h1','h2','h3','h4','h5','h6'], true ) ? $attributes['heading'] : 'h3';


//  echo '<pre>', print_r($attributes, TRUE), '</pre>';

?>
<div <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes)]); ?>>
	<div class="flair-card">
		<div class="text">
			<?php if( isset( $attributes['title'] ) && isset( $attributes['href'] ) ): ?>
			<<?php echo $heading ?> class="title">
				<a href="<?php echo esc_url( $attributes['href'] ); ?>" class="link"><?php echo esc_html( $attributes['title'] ); ?></a>
			</<?php echo $heading ?>>
			<?php else: ?>
				<div class="flair-warning"><p><strong>Warning:</strong> this block is missing a title and link.</p></div>
			<?php endif; ?>

			<?php if( ! empty( $attributes['excerpt'] ) ): ?>
			<p class="excerpt"><?php echo esc_html( $attributes['excerpt'] ); ?></p>
			<?php endif; ?>
			<?php if( isset( $attributes['attribution'] ) && ! empty( trim( $attributes['attribution'] ) ) ): ?>
			<small class="attribution"><?php echo esc_html( $attributes['attribution'] ); ?></small>
			<?php endif; ?>
			<?php if( isset( $attributes['button'] ) && ! empty( trim( $attributes['button'] ) ) ): ?>
			<p class="button"><?php echo esc_html( $attributes['button'] ); ?></p>
			<?php endif; ?>
		</div>
		<div class="media">
			<?php
			// Attachments get a srcset; a lazy-loaded one also gets sizes="auto",
			// so the browser picks a file from the card's laid-out width.
			$image = '';
			if( ! empty( $attributes['asset']['id'] ) ) {
				$image = wp_get_attachment_image( (int) $attributes['asset']['id'], 'large', false, [
					'alt' => $attributes['asset']['alt'] ?? '',
				] );
			}
			if( $image ) {
				echo $image;
			} elseif( ! empty( $attributes['asset']['url'] ) ) {
				?>
				<img src="<?php echo esc_attr( $attributes['asset']['url'] ); ?>" alt="<?php echo esc_attr( $attributes['asset']['alt'] ?? '' ); ?>">
				<?php
			}
			?>
		</div>
	</div>
</div>
