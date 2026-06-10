<?php

$attributes = $args['attributes'];
$block = $args['block'];

// collect the label and ID of each inner tab to build the tab list;
// the IDs are computed the same way the tab template computes them
$tabs = [];
$i = 0;
foreach ( (array) $block->parsed_block['innerBlocks'] as $inner_block ) {
	if ( 'flair/tab' !== $inner_block['blockName'] ) {
		continue;
	}
	$i++;
	$attrs = isset( $inner_block['attrs'] ) ? $inner_block['attrs'] : [];
	$tabs[] = [
		'label' => ! empty( $attrs['label'] ) ? $attrs['label'] : sprintf( __( 'Tab %d', 'flair' ), $i ),
		'id'    => flair_tab_anchor( $attrs ),
	];
}

/*
 * Without javascript this renders as a table of contents followed by the
 * panels as plain sections; view.js enhances it into a tabbed interface.
 * @see https://inclusive-components.design/tabbed-interfaces/
 */
?>
<div <?php echo get_block_wrapper_attributes( ['class' => 'flair-tabs'] ); ?>>
	<ul class="flair-tabs-list">
	<?php foreach ( $tabs as $tab ) : ?>
		<li><a href="#<?php echo esc_attr( $tab['id'] ); ?>"><?php echo wp_kses_post( $tab['label'] ); ?></a></li>
	<?php endforeach; ?>
	</ul>
	<?php echo wp_kses_post( $args['content'] ); ?>
</div>
