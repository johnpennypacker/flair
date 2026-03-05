<?php

	// args isn't always set, if it isn't, use the defaults
	$attributes = $args['attributes'];


// 	return array(
// 			'labels' => 'First-Year Applicant||Transfer Applicant||Graduate Applicant', // link text
// 			'links' => 'https://www.clarku.edu/undergraduate-admissions/apply/#app||https://www.clarku.edu/undergraduate-admissions/apply/transfer-students/||https://www.clarku.edu/graduate-education/admissions/',
// 			'before' => '<div class="clarku-admission-multibutton">',
// 			'after' => '</div>',
//     );
//
// 	$links = explode( '||', $attributes['links'] );
// 	$labels = explode( '||', $attributes['labels'] );


	$links = explode( '||', 'https://www.clarku.edu/undergraduate-admissions/apply/#app||https://www.clarku.edu/undergraduate-admissions/apply/transfer-students/||https://www.clarku.edu/graduate-education/admissions/' );
	$labels = explode( '||', 'First-Year Applicant||Transfer Applicant||Graduate Applicant' );


	$classes = ['flair-wrapper flair-multibutton'];
	if( isset( $attributes['orientation'] ) ) {
		$classes[] = 'orientation-' . $attributes['orientation'] ;
	}
//  echo '<pre>', print_r($attributes, TRUE), '</pre>';

?>

	<div <?php echo get_block_wrapper_attributes(['class' => implode(' ', $classes)]); ?>>

		<p class="label">I am a:</p>

		<div class="dropdown">
			<a aria-expanded="false" aria-haspopup="true" class="button dropdown-toggle" href="<?php echo $links[0]; ?>" id="dropdown-menu"><?php echo $labels[0]; ?></a>
			<div class="options" tab-index="0">
				<?php echo $args['content']; ?>
			</div>
		</div>
	</div>
