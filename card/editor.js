(function ( blocks, blockEditor, element, components, i18n ) {

	var el = element.createElement;
	var __ = i18n.__;
	var RichText = blockEditor.RichText;

	var classes = 'card flair-io';
	
	blocks.registerBlockType( 'flair/card', {
	
		icon: el('svg', { width: 24, height: 24 },
			el('rect', {
				'x': 1,
				'y': 1,
				'height': 9,
				'width': 22
			} ),
			el('rect', { 
				'x': 1,
				'y': 11,
				'height': 12,
				'width': 22
			} )
		),
		
		edit: function( props ) {
					

			var blockProps = wp.blockEditor.useBlockProps({ className: classes });
			var excerpt = props.attributes.excerpt;

			console.log('edit', blockProps, props);
			
			return el( 'div', Object.assign( blockProps ), 
				el( 'a', { className: 'link' }, 
					el( 'h2', {
						className: 'title',
						onChange: function( title ) {
							props.setAttributes( { title: title } );
						},
					}, 
						props.attributes.title
					),					
				),
				el( 'img', { className: 'media', src: '' }),
				// el( 'div', { className: 'categories' }),
				el( RichText, {
					tagName: 'div',
					className: 'excerpt',
					value: props.attributes.excerpt,
					onChange: function( val ) {
						props.setAttributes( { excerpt: val } ); // Store updated content as a block attribute
					},
					placeholder: __( 'your description...' ), // Display this text before any content has been added by the user
				})
			);

		},


		save: function( props ) {
		
			return el( 'div', { className: classes }, 
				el(
					'a',
					{ className: 'link' }, 
					el( 'h2', { className: 'title' }, 
						props.attributes.title
					),					
				),
				// el( 'img', { className: 'media', src: '' }),
				// el( 'div', { className: 'categories' }),
				el( RichText.Content, {
					tagName: 'div',
					className: 'excerpt',
					value: props.attributes.excerpt
				})
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

