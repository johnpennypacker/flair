<?php
// This file is generated. Do not modify it manually.
return array(
	'card' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'flair/card',
		'version' => '0.2.0',
		'title' => 'Card',
		'category' => 'flair',
		'description' => 'It\'s like a link with tons of context.',
		'example' => array(
			
		),
		'supports' => array(
			'align' => array(
				'left',
				'right',
				'center',
				'wide'
			),
			'html' => false
		),
		'attributes' => array(
			'href' => array(
				'type' => 'string',
				'default' => '#'
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
		'example' => array(
			
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
			'color' => true
		),
		'textdomain' => 'flair',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
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
			
		),
		'supports' => array(
			'align' => array(
				'left',
				'right',
				'center'
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
			'alignment' => array(
				'type' => 'string',
				'default' => 'center'
			)
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
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
		'example' => array(
			
		),
		'supports' => array(
			'align' => true
		),
		'textdomain' => 'flair',
		'attributes' => array(
			'date' => array(
				'type' => 'string'
			),
			'marker' => array(
				'type' => 'string'
			)
		),
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
		'example' => array(
			
		),
		'attributes' => array(
			'content' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'color' => array(
				'background' => 'true',
				'gradients' => 'true'
			),
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
