(function ( blocks, blockEditor, element, components, i18n ) {

	var el = element.createElement;
	var __ = i18n.__;
	var RichText = blockEditor.RichText;
	var MediaUpload = blockEditor.MediaUpload;

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
					
			var attributes = props.attributes;

			var blockProps = wp.blockEditor.useBlockProps({ className: classes });
			var excerpt = attributes.excerpt;

			var onSelectImage = function( media ) {
				return props.setAttributes( {
					mediaURL: media.url,
					mediaID: media.id,
					mediaAlt: media.alt,
				} );
			};

			console.log('edit', props);
			
			return el( 'div', Object.assign( blockProps ), 
				el( 'a', { className: 'link' }, 
					el( blockEditor.RichText, {
						tagName: 'h2',
						className: 'title',
						value: attributes.title,
						allowedFormats: [ 'core/bold', 'core/italic', 'core/subscript', 'core/superscript', 'core/strikethrough' ],
						onChange: function( value ) {
							props.setAttributes( { title: value } );
						},
						placeholder: __( 'title' ), 
					}),
				),
				el(
					'div',
					{ className: 'media' },
					el( MediaUpload, {
						onSelect: onSelectImage,
						allowedTypes: 'image',
						value: attributes.mediaID,
						render: function( obj ) {
							return el(
								components.Button,
								{
									className: attributes.mediaID
										? 'image-button'
										: 'button button-large',
									onClick: obj.open,
								},
								! attributes.mediaID
									? __( 'Add media', 'flair' )
									: el( 'img', { src: attributes.mediaURL, alt: attributes.mediaAlt } )
							);
						},
					} )
				),
				// el( 'div', { className: 'meta' }),
				el( RichText, {
					tagName: 'div',
					className: 'excerpt',
					value: attributes.excerpt,
					onChange: function( val ) {
						props.setAttributes( { excerpt: val } ); // Store updated content as a block attribute
					},
					placeholder: __( 'your description...' ), // Display this text before any content has been added by the user
				})
			);

		},


		save: function( props ) {

			var attributes = props.attributes;
			
			// console.log('save', attributes);
		
			return el( 'div', { className: classes }, 
				el(
					'a',
					{ className: 'link' }, 
					el( RichText.Content, {
						tagName: 'h2',
						className: 'title',
						value: attributes.title
					})
				),
				el( 'img', { className: 'media', src: attributes.mediaURL, alt: attributes.mediaAlt }),
				// el( 'div', { className: 'categories' }),
				el( RichText.Content, {
					tagName: 'div',
					className: 'excerpt',
					value: attributes.excerpt
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

