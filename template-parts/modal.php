<?php

$attributes = $args['attributes'];

$modal_id = flair_modal_id( $attributes );
$label    = isset( $attributes['label'] ) ? $attributes['label'] : '';

// The ID is how a trigger addresses this modal and how the no-JS `:target`
// fallback reveals it. Without one there is nothing to render.
if ( '' === $modal_id ) {
	return;
}

/*
 * This renders in the flow of the document, hidden by CSS, and view.js moves it
 * into a native <dialog> on load. That ordering is deliberate: without
 * javascript a trigger link's fragment still resolves here and `.flair-modal:target`
 * reveals the content, so the modal degrades into a plain disclosure rather than
 * disappearing. It also keeps the content in the page for crawlers.
 *
 * @see src/blocks/modal/view.js
 */

$wrapper_attributes = [
	'class' => 'flair-modal',
	'id'    => $modal_id,
];

// Names the dialog for assistive technology once view.js promotes it.
if ( '' !== $label ) {
	$wrapper_attributes['aria-label'] = $label;
}

?>
<div <?php echo get_block_wrapper_attributes( $wrapper_attributes ); ?>>
	<?php
	/*
	 * A link rather than a <button> so the close control also works in the
	 * no-JS fallback, where clearing the fragment is the only way back out of
	 * `:target`. view.js intercepts the click and calls dialog.close() instead,
	 * so the href is never actually followed once enhanced.
	 */
	?>
	<a class="flair-modal-close" href="#" aria-label="<?php esc_attr_e( 'Close', 'flair' ); ?>">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
			<path fill="currentColor" d="M18.3,5.71a1,1,0,0,0-1.41,0L12,10.59,7.11,5.7A1,1,0,0,0,5.7,7.11L10.59,12,5.7,16.89a1,1,0,1,0,1.41,1.41L12,13.41l4.89,4.89a1,1,0,0,0,1.41-1.41L13.41,12l4.89-4.89A1,1,0,0,0,18.3,5.71Z"/>
		</svg>
	</a>
	<div class="flair-modal-content">
		<?php
		/*
		 * Deliberately NOT wp_kses_post(), unlike the other flair templates.
		 *
		 * $content here is inner-block HTML that WordPress has already rendered
		 * from post content, which kses filtered on save for any user without
		 * `unfiltered_html`. Re-filtering it at render time adds no protection and
		 * silently destroys the two things modals exist for: wp_kses_post() strips
		 * <iframe> (every video embed) and <form>/<input>/<select> (every form).
		 * Core's own dynamic blocks echo $content directly for the same reason.
		 *
		 * @see CLAUDE.md — "Escaping"
		 */
		echo $args['content'];
		?>
	</div>
</div>
