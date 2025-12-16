<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */


		$templates = [
			'flair/card.php',
// 			'flair/card.html',
			'template-parts/flair/card.php',
// 			'template-parts/flair/card.html',
		];

		// First, search for PHP templates, which block themes can also use.
		$template = locate_template( $templates );
// 		echo '<pre>template: ', print_r( $template, TRUE ), '</pre>';

		// Pass the result into the block template locator and let it figure
		// out whether block templates are supported and this template exists.
		$template = locate_block_template( $template, 'flair-card', $templates );
// 		echo '<pre>block template: ', print_r( $template, TRUE ), '</pre>';

		// if we couldn't find a template in the theme, use the one from the plugin
		if( empty( $template ) ) {
			$template = FLAIR_PATH . 'template-parts/card.php';
		}

		load_template( $template, FALSE, ['attributes' => $attributes] );

