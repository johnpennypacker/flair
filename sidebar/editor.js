(function ( blocks, blockEditor, element, components, i18n ) {

	var el = element.createElement;
	var __ = i18n.__;

	var useBlockProps = blockEditor.useBlockProps;
	var InnerBlocks = blockEditor.InnerBlocks;
	

	blocks.registerBlockType( 'flair/sidebar', {
	
		icon: el('svg', { width: 24, height: 24 },
			el('path', { d: "M23.037,1.042l-22.037,0l0,22.03l22.037,-0l-0,-22.03Zm-1,1l-0,20.03c-0,-0 -20.037,-0 -20.037,-0c-0,-0 -0,-20.03 -0,-20.03l20.037,0Z" } ),
			el('path', { d: "M21,3.042l-9,0l0,15.958l9,0l0,-15.958Zm-1.007,1l-0,13.958c-0,0 -6.986,0 -6.986,0c0,-0 0,-13.958 0,-13.958l6.986,0Z" } ),
			el('rect', { x: "12", y: "11", width: "9", height: "1" } ),
			el('rect', { x: "15", y: "14", width: "3", height: "1" } ),
			el('path', { d: "M20.841,11.293l-7.739,-7.74l-0.708,0.707l7.74,7.74l0.707,-0.707Z" } )
		),
		
		supports: {
	    align: true
		},

		edit: function( props ) {
			return el(
				'aside',
				useBlockProps(),
				el( InnerBlocks )
			);
		},
		
		save: function( props ) {
			return el(
				'aside',
				useBlockProps.save(),
				el( InnerBlocks.Content )
			);
		}


	} );

})(
	window.wp.blocks,
	window.wp.blockEditor,
	window.wp.element,
	window.wp.components,
	window.wp.i18n
);

