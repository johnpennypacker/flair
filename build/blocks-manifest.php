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
		'render' => 'file:./render.php'
	),
	'metric' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'flair/metric',
		'version' => '0.2.0',
		'title' => 'Metric',
		'category' => 'widgets',
		'description' => 'Display a key figure in a dramatic way.',
		'example' => array(
			
		),
		'attributes' => array(
			'number' => array(
				'type' => 'string'
			),
			'qualifier' => array(
				'type' => 'string'
			),
			'link' => array(
				'type' => 'string'
			),
			'orientation' => array(
				'type' => 'string',
				'default' => 'auto'
			)
		),
		'supports' => array(
			'align' => true,
			'html' => false
		),
		'textdomain' => 'flair',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	)
);
