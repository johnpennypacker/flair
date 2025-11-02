<?php
/**
 * 
 */

/**
 * Add the carousel script and stylesheet.
 */
function flair_carousel_enqueus() {
	wp_enqueue_script( 'flair-carousel', plugins_url( 'carousel.js', __FILE__ ), array('wp-hooks'), '', array( 'in_footer' => true, 'strategy'  => 'defer') );
	wp_enqueue_style( 'flair-carousel', plugins_url( 'carousel.css', __FILE__ ), array() );
}
add_action( 'wp_enqueue_scripts', 'flair_carousel_enqueus' );

/**
 * Register a variation of columns to use as a carousel.
 */
function flair_carousel_variation( $variations, $block_type ) {
    // Only modify variations for the image block
    if ( 'core/columns' !== $block_type->name ) {
        return $variations;
    }

    // Add a custom variation
    $variations[] = array(
        'name'        => 'flairousel',
        'title'       => __( 'Carousel', 'flair' ),
        'description' => __( 'A custom set of columns that work like a carousel.', 'flair' ),
        'scope'       => array( 'inserter' ),
        'isDefault'   => false,
		'attributes' => array(
            'className' => 'flairousel'
        ),
		'innerBlocks' => array(
			array(
				'core/column',
			),
			array(
				'core/column',
			),
			array(
				'core/column',
			)
		),
		'icon' => 'leftright', // only js can use a custom svg.  sad.
		'namespace' => 'flairousel',
		'isActive' => ['className']
    );

    return $variations;
}
add_filter( 'get_block_type_variations', 'flair_carousel_variation', 10, 2 );