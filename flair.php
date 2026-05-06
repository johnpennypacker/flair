<?php
/**
 * Plugin Name:       Flair
 * Description:       Fanciful add-ons.  Take two.
 * Version:           0.2.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            John Pennypacker
 * Text Domain:       flair
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'FLAIR_PATH', plugin_dir_path( __FILE__ ) );
define( 'FLAIR_URL', plugin_dir_url( __FILE__ ) );


include_once( 'build/flairousel/carousel.php' );
include_once( 'build/fixie/index.php' );
include_once( 'build/iconic/iconic.php' );
include_once( 'build/kinetic/kinetic.php' );
include_once( 'build/zoomer/zoomer.php' );


/**
 * Makes sure that the handle exists for inlining.
 */
function flair_initialize_style() {
	wp_register_style( 'flair', FALSE );
}
add_action( 'init', 'flair_initialize_style' );

/**
 * Add the main flair script and stylesheet
 */
function flair_enqueues() {
	$asset = include FLAIR_PATH . 'build/flair-core/flair-editor.asset.php';

	wp_enqueue_script( 'flair', FLAIR_URL . 'build/flair-core/flair.js', $asset['dependencies'], $asset['version'], array( 'in_footer' => true, 'strategy'  => 'defer') );
	wp_enqueue_style( 'flair', FLAIR_URL . 'build/flair-core/frontend.css', array(), $asset['version'] );
}
add_action( 'wp_enqueue_scripts', 'flair_enqueues' );

/**
 * Enqueue Editor assets.
 */
function flair_enqueue_editor_assets() {
	$asset = include FLAIR_PATH . 'build/flair-core/flair.asset.php';
	wp_enqueue_script( 'flair-editor', FLAIR_URL . 'build/flair-core/flair-editor.js', $asset['dependencies'], $asset['version'], array( 'in_footer' => true, 'strategy'  => 'defer') );
	wp_enqueue_style( 'flair', FLAIR_URL . 'build/flair-core/frontend.css', array(), $asset['version'] );
}
add_action( 'enqueue_block_assets', 'flair_enqueue_editor_assets' );


/**
 * Registers the block using a `blocks-manifest.php` file, which improves the performance of block type registration.
 * Behind the scenes, it also registers all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function flair_blocks_init() {

	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
	 * based on the registered block metadata.
	 * Added in WordPress 6.8 to simplify the block metadata registration process added in WordPress 6.7.
	 *
	 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
	 */
	if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
		wp_register_block_types_from_metadata_collection( __DIR__ . '/build/blocks', __DIR__ . '/build/blocks-manifest.php' );
		return;
	}

	/**
	 * Registers the block(s) metadata from the `blocks-manifest.php` file.
	 * Added to WordPress 6.7 to improve the performance of block type registration.
	 *
	 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
	 */
	if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
		wp_register_block_metadata_collection( __DIR__ . '/build/blocks', __DIR__ . '/build/blocks-manifest.php' );
	}
	/**
	 * Registers the block type(s) in the `blocks-manifest.php` file.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
	foreach ( array_keys( $manifest_data ) as $block_type ) {
		register_block_type( __DIR__ . "/build/blocks/{$block_type}" );
	}
}
add_action( 'init', 'flair_blocks_init' );


function flair_add_block_category( $categories ) {
	$flair_category = array(
		array(
			'slug'  => 'flair',
			'title' => __( 'Flair', 'flair' ),
			'icon'  => null,
		),
	);

	return array_merge( $categories, $flair_category );
}
add_filter( 'block_categories_all', 'flair_add_block_category', 10, 2 );

// @todo: consolidate js and css https://developer.wordpress.org/news/2024/09/how-to-build-a-multi-block-plugin/


/**
 * Check for a theme template, if none, use flair's default.
 *
 * @param str $template_name is the name of the component / template to look for
 * @param arr $attributes the typical template variables
 * @param obj $block the block instance
 * @param str $content the block content
 * @return bool
 */
function flair_use_template( $template_name, $attributes, $block, $content ) {

	$templates = [
		'flair/' . $template_name . '.php',
// 			'flair/' . $template_name . '.html',
		'template-parts/flair/' . $template_name . '.php',
// 			'template-parts/flair/' . $template_name . '.html',
	];


	// First, search for PHP templates, which block themes can also use.
	$template = locate_template( $templates );
// 		echo '<pre>template: ', print_r( $template, TRUE ), '</pre>';

	// Pass the result into the block template locator and let it figure
	// out whether block templates are supported and this template exists.
	$template = locate_block_template( $template, 'flair-' . $template_name, $templates );
// 		echo '<pre>block template: ', print_r( $template, TRUE ), '</pre>';

	// if we couldn't find a template in the theme, use the one from the plugin
	if( empty( $template ) ) {
		$template = FLAIR_PATH . 'template-parts/' . $template_name . '.php';
	}

	return load_template( $template, FALSE, ['attributes' => $attributes, 'block' => $block, 'content' => $content ] );

}







function flair_add_list_option_to_columns() {
	register_block_style( 'core/columns', array(
		'name'         => 'list',
		'label'        => __( 'List', 'flair' ),
		'inline_style' => '.wp-block-image.is-style-hand-drawn img {
			border: 2px solid currentColor;
			overflow: hidden;
			box-shadow: 0 4px  10px 0 rgba( 0, 0, 0, 0.3 );
			border-radius: 255px 15px 225px 15px/15px 225px 15px 255px !important;
		}'
    ) );
}
add_action( 'init', 'flair_add_list_option_to_columns' );


function flair_columns_to_list( $block_content, $block ) {

	if( isset( $block['attrs']['className'] ) && 'is-style-list' == $block['attrs']['className'] ) {

		$dom = new DOMDocument();

		libxml_use_internal_errors( TRUE ); // suppresses warnings about svg elements, etc.
		@$dom->loadHTML( '<?xml encoding="utf-8" ?>' . $block_content, LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD );
		$xpath = new DOMXPath( $dom );

    $col = $xpath->query("//*[contains(@class, 'wp-block-column')]");
		foreach ($col as $div) {
			$ul = flair_change_tag_name( $div, 'li' );
		}

    $cols = $xpath->query("//*[contains(@class, 'wp-block-columns')]");
		foreach ($cols as $div) {
			$ul = flair_change_tag_name( $div, 'ul' );
		}

		$block_content = $dom->saveHTML();

	}
	return $block_content;
}
add_filter( 'render_block_core/columns', 'flair_columns_to_list', 10, 2 );

function flair_change_tag_name( $node, $name ) {
	$childnodes = array();
	foreach ($node->childNodes as $child){
		$childnodes[] = $child;
	}
	$newnode = $node->ownerDocument->createElement($name);
	foreach ($childnodes as $child){
		$child2 = $node->ownerDocument->importNode($child, true);
		$newnode->appendChild($child2);
	}
	foreach ($node->attributes as $attrName => $attrNode) {
		$attrName = $attrNode->nodeName;
		$attrValue = $attrNode->nodeValue;
		$newnode->setAttribute($attrName, $attrValue);
	}
	$node->parentNode->replaceChild($newnode, $node);
	return $newnode;
}

