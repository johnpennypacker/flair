<?php

	$template_name = 'overlay';

	$attributes = flair_post_source_attributes( $attributes, $block );

	flair_use_template( $template_name, $attributes, $block, $content );
