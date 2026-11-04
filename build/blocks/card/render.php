<?php

	$template_name = 'card';

	$attributes = flair_post_source_attributes( $attributes, $block );

	// A new card starts with excerpt, attribution and button paragraphs, and
	// an author leaves the ones they don't want empty. Empty fields used to
	// render nothing, so empty paragraphs don't either -- dropped here rather
	// than hidden, so the card's :last-child spacing still finds the last one.
	$content = preg_replace( '#<p\b[^>]*>\s*</p>#', '', $content );

	flair_use_template( $template_name, $attributes, $block, $content );
