(function ( blocks, blockEditor, element, components, i18n ) {

	var el = element.createElement;
	var __ = i18n.__;

	blocks.registerBlockType( 'flair/sidler', {
	
		icon: el('svg', { width: 24, height: 24 },
			el('path', { d: "M7.303,1.042L1.961,1.042L-0.039,23.072L5.359,23.072C3.242,21.88 1.977,19.757 1.977,17.095L1.977,17.051C1.977,13.004 5.118,10.527 10.625,10.195L16.95,9.819L16.95,8.072C16.95,5.507 15.291,3.959 12.328,3.959C9.563,3.959 7.86,5.264 7.462,7.121L7.418,7.32L2.906,7.32L2.928,7.077C3.144,4.478 4.683,2.271 7.303,1.042ZM16.95,23.072L16.95,20.037L16.861,20.037C16.17,21.317 15.125,22.359 13.856,23.072L16.95,23.072ZM17.588,1.042C20.222,2.302 21.749,4.637 21.749,7.674L21.749,23.072L21.99,23.072L23.99,1.042L17.588,1.042ZM6.799,16.985L6.799,16.941C6.799,14.972 8.391,13.712 11.266,13.535L16.95,13.181L16.95,14.994C16.95,18.024 14.406,20.302 11.045,20.302C8.479,20.302 6.799,19.019 6.799,16.985Z" } )
		),

		edit: function( props ) {
					
			var blockProps = wp.blockEditor.useBlockProps();
			var content = props.attributes.content;
			
			return el('div', Object.assign( blockProps, { className: 'sidler flair-io' } ), 
				el( blockEditor.RichText, {
					tagName: 'div',
					className: 'line',
					value: props.attributes.content,
					allowedFormats: [ 'core/bold', 'core/italic' ],
					onChange: function( content ) {
						props.setAttributes( { content: content } ); // Store updated content as a block attribute
					},
					placeholder: __( 'sidle...' ), // Display this text before any content has been added by the user
				})
			);
		},
		
		/**
		 * this is what gets saved to the database and displayed on pages
		 */
		save: function( props ) {
			var blockProps = blockEditor.useBlockProps.save();

			//  @todo: work out css to allow for different alignments			
			var classes = 'sidler flair-io';
// 			if( props.attributes.align ) {
// 				classes += ' align' + props.attributes.align;
// 			}
			classes += ' alignfull';
		
			return el( 'div', { className: classes }, 
				el( blockEditor.RichText.Content, blockEditor.useBlockProps.save( {
					tagName: 'div',
					className: 'line',
					value: props.attributes.content,
				} ) )
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

