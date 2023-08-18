(function ( blocks, element, blockEditor, i18n ) {

	var el = element.createElement,
		registerBlockType = blocks.registerBlockType,
		useBlockProps = blockEditor.useBlockProps,
		__ = i18n.__,
		InnerBlocks = blockEditor.InnerBlocks;

	blocks.registerBlockType( 'flair/milestone', {
	
		icon: el('svg', { width: 24, height: 24 },
			el('path', { d: "M7.7,12.5H18v-1.1H7.7c-0.2-1.2-1.1-2.1-2.3-2.3V7.9c1.2-0.2,2.1-1.1,2.3-2.3H13V4.6H7.7C7.5,3.4,6.6,2.5,5.4,2.3V1H4.4v1.3 C3,2.5,2,3.7,2,5.1s1,2.6,2.4,2.8v1.2C3,9.4,2,10.6,2,12c0,1.4,1,2.6,2.4,2.8v1.2C3,16.3,2,17.5,2,18.9s1,2.6,2.4,2.8V23h1.1v-1.3 c1.2-0.2,2.1-1.1,2.3-2.3H11v-1.1H7.7c-0.2-1.2-1.1-2.1-2.3-2.3v-1.2C6.6,14.6,7.5,13.7,7.7,12.5z M3.1,5.1c0-1,0.8-1.8,1.8-1.8 s1.8,0.8,1.8,1.8S5.9,6.9,4.9,6.9S3.1,6.1,3.1,5.1z M6.7,18.9c0,1-0.8,1.8-1.8,1.8s-1.8-0.8-1.8-1.8c0-1,0.8-1.8,1.8-1.8 S6.7,17.9,6.7,18.9z M4.9,13.8c-1,0-1.8-0.8-1.8-1.8s0.8-1.8,1.8-1.8S6.7,11,6.7,12S5.9,13.8,4.9,13.8z" } )
		),

		supports: {
	    align: true
		},

		edit: function( props ) {
			return el(
				'div',
				useBlockProps({
					className: 'milestone flair-io',
        }),
				el( InnerBlocks )
			);
		},
		
		save: function( props ) {
			return el(
				'div',
				useBlockProps.save({
					className: 'milestone flair-io',
        }),
				el( InnerBlocks.Content )
			);
		}


	});

})(
	window.wp.blocks,
	window.wp.element,
	window.wp.blockEditor,
	window.wp.i18n
);

