<?php
// This file is generated. Do not modify it manually.
return array(
	'boxout' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'flair/boxout',
		'version' => '0.1.0',
		'title' => 'Boxout',
		'category' => 'flair',
		'description' => 'Display related content',
		'keywords' => array(
			'boxout',
			'sidebar',
			'aside'
		),
		'example' => array(
			'attributes' => array(
				
			),
			'innerBlocks' => array(
				array(
					'name' => 'core/paragraph',
					'attributes' => array(
						'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et eros eu felis.'
					)
				)
			)
		),
		'supports' => array(
			'align' => true,
			'anchor' => true,
			'color' => array(
				'text' => true,
				'link' => true,
				'background' => true
			),
			'shadow' => true,
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'blockGap' => false
			),
			'typography' => array(
				'textAlign' => true
			)
		),
		'textdomain' => 'flair',
		'attributes' => array(
			'element' => array(
				'type' => 'string',
				'default' => 'aside'
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'card' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'flair/card',
		'version' => '0.2.0',
		'title' => 'Card',
		'category' => 'flair',
		'description' => 'It\'s like a link with tons of context.',
		'example' => array(
			'attributes' => array(
				'asset' => array(
					'url' => 'https://pd.w.org/2023/03/8636413c9dfe23357.98014051-768x512.jpg'
				),
				'title' => 'Faciamo così',
				'excerpt' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et eros eu felis.',
				'button' => 'Explore',
				'orientation' => 'vertical',
				'aspect' => '16-9'
			)
		),
		'supports' => array(
			'align' => array(
				'left',
				'right',
				'center',
				'wide'
			),
			'anchor' => true,
			'color' => array(
				'background' => true,
				'text' => true
			),
			'html' => false,
			'shadow' => true,
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'blockGap' => false
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true
			)
		),
		'attributes' => array(
			'href' => array(
				'type' => 'string',
				'default' => '#'
			),
			'target' => array(
				'type' => 'string'
			),
			'asset' => array(
				'type' => 'object',
				'selector' => '.media img',
				'default' => array(
					'url' => null
				),
				'id' => array(
					'type' => 'number'
				),
				'url' => array(
					'type' => 'string',
					'source' => 'attribute',
					'attribute' => 'src'
				),
				'alt' => array(
					'type' => 'string',
					'source' => 'attribute',
					'attribute' => 'alt'
				)
			),
			'title' => array(
				'type' => 'string'
			),
			'meta' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => '.meta'
			),
			'excerpt' => array(
				'type' => 'string'
			),
			'attribution' => array(
				'type' => 'string'
			),
			'button' => array(
				'type' => 'string'
			),
			'orientation' => array(
				'type' => 'string',
				'default' => 'auto'
			),
			'aspect' => array(
				'type' => 'string',
				'default' => 'none'
			),
			'heading' => array(
				'type' => 'string',
				'default' => 'h3'
			),
			'call' => array(
				'type' => 'string',
				'source' => 'text',
				'selector' => '.call'
			)
		),
		'textdomain' => 'flair',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./card.js',
		'render' => 'file:./render.php'
	),
	'carousel' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'flair/carousel',
		'version' => '0.1.0',
		'title' => 'Carousel',
		'category' => 'flair',
		'description' => 'A slider.',
		'icon' => 'format-gallery',
		'supports' => array(
			'html' => false,
			'layout' => null,
			'typography' => array(
				'textAlign' => true
			)
		),
		'attributes' => array(
			'perpage' => array(
				'type' => 'string',
				'default' => '1'
			),
			'showArrows' => array(
				'type' => 'boolean',
				'default' => true
			),
			'showDots' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'example' => array(
			
		),
		'textdomain' => 'flair',
		'editorStyle' => 'file:./index.css',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'carousel-slide' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'flair/carousel-slide',
		'version' => '0.1.0',
		'title' => 'Carousel slide',
		'category' => 'flair',
		'description' => 'The individual slides within a carousel.',
		'icon' => 'carrot',
		'parent' => array(
			'flair/carousel'
		),
		'supports' => array(
			'html' => false,
			'layout' => null,
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'blockGap' => true
			)
		),
		'attributes' => array(
			
		),
		'example' => array(
			'text' => 'Save'
		),
		'textdomain' => 'flair',
		'editorStyle' => 'file:./index.css',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php'
	),
	'eyebrow' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'flair/eyebrow',
		'version' => '0.1.0',
		'title' => 'Eyebrow',
		'category' => 'flair',
		'description' => 'Creates a pre-header, kicker, or overline',
		'keywords' => array(
			'overline',
			'kicker',
			'header',
			'eyebrow'
		),
		'attributes' => array(
			'content' => array(
				'type' => 'string'
			),
			'element' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'align' => true,
			'html' => false,
			'splitting' => false,
			'color' => array(
				'background' => false,
				'text' => true
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'blockGap' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true
			)
		),
		'example' => array(
			'attributes' => array(
				'content' => 'Let’s do this'
			)
		),
		'textdomain' => 'flair',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'layer' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'flair/layer',
		'version' => '0.1.0',
		'title' => 'Layer',
		'category' => 'flair',
		'description' => 'A layer of content within a stack.',
		'example' => array(
			
		),
		'parent' => array(
			'flair/stack'
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'flair',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	),
	'metric' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'flair/metric',
		'version' => '0.1.0',
		'title' => 'Metric',
		'category' => 'flair',
		'description' => 'Display stats in style',
		'keywords' => array(
			'number',
			'percentage',
			'metric',
			'data'
		),
		'example' => array(
			'attributes' => array(
				'number' => '100%',
				'qualifier' => 'awesome'
			)
		),
		'textdomain' => 'flair',
		'attributes' => array(
			'number' => array(
				'type' => 'string'
			),
			'qualifier' => array(
				'type' => 'string'
			),
			'href' => array(
				'type' => 'string'
			),
			'target' => array(
				'type' => 'string'
			),
			'attribution' => array(
				'type' => 'string'
			),
			'alignment' => array(
				'type' => 'string',
				'default' => 'center'
			)
		),
		'supports' => array(
			'align' => array(
				'left',
				'right',
				'center'
			),
			'anchor' => true,
			'color' => array(
				'background' => true,
				'link' => true,
				'text' => true
			),
			'html' => false,
			'shadow' => true,
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'blockGap' => false
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	),
	'milestone' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'flair/milestone',
		'version' => '0.1.0',
		'title' => 'Milestone',
		'category' => 'flair',
		'description' => 'Creates an entry on a timeline',
		'keywords' => array(
			'date',
			'milestone',
			'timeline'
		),
		'supports' => array(
			'color' => true,
			'html' => false
		),
		'textdomain' => 'flair',
		'attributes' => array(
			'date' => array(
				'type' => 'string'
			),
			'layout' => array(
				'type' => 'string',
				'default' => 'left'
			),
			'marker' => array(
				'type' => 'string'
			)
		),
		'example' => array(
			'date' => 'Apr 30',
			'marker' => 'dot-hollow',
			'innerBlocks' => array(
				array(
					'name' => 'core/paragraph',
					'attributes' => array(
						'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et eros eu felis.'
					)
				)
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'multibutton' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'flair/multibutton',
		'version' => '0.1.0',
		'title' => 'Multibutton',
		'category' => 'flair',
		'description' => 'A hybrid button/dropdown.',
		'allowedBlocks' => array(
			'flair/multibutton-button'
		),
		'supports' => array(
			'anchor' => true,
			'color' => array(
				'background' => true,
				'text' => true
			),
			'__experimentalExposeControlsToChildren' => true,
			'layout' => null,
			'typography' => array(
				'fontSize' => true,
				'textAlign' => true
			)
		),
		'attributes' => array(
			'width' => array(
				'type' => 'string',
				'default' => '100%'
			)
		),
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'flair/multibutton-button',
					'attributes' => array(
						'text' => 'Save'
					)
				),
				array(
					'name' => 'flair/multibutton-button',
					'attributes' => array(
						'text' => 'Save & Close'
					)
				)
			)
		),
		'textdomain' => 'flair',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	),
	'multibutton-button' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'flair/multibutton-button',
		'version' => '0.1.0',
		'title' => 'Multibutton Button',
		'category' => 'flair',
		'description' => 'The individual buttons that go inside a multibutton.',
		'parent' => array(
			'flair/multibutton'
		),
		'supports' => array(
			'html' => false,
			'layout' => null,
			'typography' => array(
				'textAlign' => true
			)
		),
		'attributes' => array(
			'href' => array(
				'type' => 'string',
				'default' => '#'
			),
			'text' => array(
				'type' => 'string'
			)
		),
		'example' => array(
			'text' => 'Save'
		),
		'textdomain' => 'flair',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php'
	),
	'overlay' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'flair/overlay',
		'version' => '0.2.0',
		'title' => 'Overlay',
		'category' => 'flair',
		'description' => 'It\'s a cross between a card and a cover.',
		'supports' => array(
			'align' => array(
				'left',
				'right',
				'center',
				'wide'
			),
			'anchor' => true,
			'color' => array(
				'background' => true,
				'text' => true
			),
			'dimensions' => array(
				'minHeight' => true
			),
			'html' => false,
			'shadow' => true,
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'blockGap' => false
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true
			)
		),
		'attributes' => array(
			'href' => array(
				'type' => 'string',
				'default' => '#'
			),
			'target' => array(
				'type' => 'string'
			),
			'asset' => array(
				'type' => 'object',
				'selector' => '.media img',
				'default' => array(
					'url' => null
				),
				'id' => array(
					'type' => 'number'
				),
				'url' => array(
					'type' => 'string',
					'source' => 'attribute',
					'attribute' => 'src'
				),
				'alt' => array(
					'type' => 'string',
					'source' => 'attribute',
					'attribute' => 'alt'
				)
			),
			'title' => array(
				'type' => 'string'
			),
			'eyebrow' => array(
				'type' => 'string'
			),
			'aspect' => array(
				'type' => 'string',
				'default' => '3-2'
			),
			'heading' => array(
				'type' => 'string',
				'default' => 'h3'
			)
		),
		'example' => array(
			'attributes' => array(
				'asset' => array(
					'url' => 'https://pd.w.org/2026/03/36669bbe96800c4c4.81439497-768x960.jpg'
				),
				'eyebrow' => 'Your overlay',
				'title' => 'Faciamo così',
				'aspect' => '3-2'
			),
			'innerBlocks' => array(
				array(
					'name' => 'core/paragraph',
					'attributes' => array(
						'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et eros eu felis.'
					)
				)
			)
		),
		'textdomain' => 'flair',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	),
	'sidler' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'flair/sidler',
		'version' => '0.1.0',
		'title' => 'Sidler',
		'category' => 'flair',
		'icon' => 'smiley',
		'description' => 'It\'s like a marquee for Gen alpha.',
		'attributes' => array(
			'content' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'color' => array(
				'background' => 'true',
				'gradients' => 'true',
				'text' => 'true'
			),
			'html' => false,
			'splitting' => false,
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'blockGap' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true
			)
		),
		'example' => array(
			'attributes' => array(
				'content' => 'Lorem ipsum dolor sit amet.'
			)
		),
		'textdomain' => 'flair',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	),
	'stack' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'flair/stack',
		'version' => '0.1.0',
		'title' => 'Stack',
		'category' => 'flair',
		'allowedBlocks' => array(
			'flair/layer'
		),
		'description' => 'A stack of content.',
		'example' => array(
			
		),
		'supports' => array(
			'align' => true,
			'html' => false
		),
		'textdomain' => 'flair',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	)
);
