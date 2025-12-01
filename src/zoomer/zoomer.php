<?php
/**
 *
 */

/**
 * Add the zoomer script and stylesheet
 */
function flair_zoomer_enqueues() {

	$asset = include FLAIR_PATH . 'build/zoomer/zoomer.asset.php';
	wp_enqueue_style( 'flair-zoomer', FLAIR_URL . 'build/zoomer/zoomer-styles.css', [], $asset['version'] );
	wp_enqueue_script( 'flair-zoomer', plugins_url( 'zoomer.js', __FILE__ ), $asset['dependencies'], $asset['version'], array( 'in_footer' => true, 'strategy'  => 'defer') );

}
add_action( 'wp_enqueue_scripts', 'flair_zoomer_enqueues' );

/**
 * Register a variation of columns to use as a carousel.
 */
function flair_zoomer_variation( $variations, $block_type ) {
	// Only modify variations for the image block
	if ( 'core/image' !== $block_type->name ) {
		return $variations;
	}

	// Add a custom variation
	$variations[] = array(
		'name'        => 'zoomer',
		'title'       => __( 'Zoomer', 'flair' ),
		'description' => __( 'Adds a magnifying glass effect to images that follows the cursor.', 'flair' ),
		'scope'       => array( 'inserter' ),
		'isDefault'   => false,
		'attributes' => array(
			'className' => 'ok-zoomer'
		),
		'icon' => 'search', // only js can use a custom svg.  sad.
		'namespace' => 'ok-zoomer',
		'isActive' => ['className']
	);

	return $variations;
}
add_filter( 'get_block_type_variations', 'flair_zoomer_variation', 10, 2 );
