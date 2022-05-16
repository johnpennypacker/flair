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
// 			console.log('edit', props);
			var attributes = props.attributes;

			var blockProps = wp.blockEditor.useBlockProps({ className: classes });
			var excerpt = attributes.excerpt;

			var onSelectImage = function( media ) {
				console.log(media);
				return props.setAttributes( {
					mediaURL: media.url,
					mediaID: media.id,
					mediaAlt: media.alt,
				} );
			};
			
			function getCall() {
				if( props.isSelected || attributes.call ) {
					return el( blockEditor.RichText, {
						tagName: 'div',
						className: 'call',
						value: attributes.call,
						allowedFormats: [ 'core/bold', 'core/italic', 'core/subscript', 'core/superscript', 'core/strikethrough' ],
						onChange: function( value ) {
							props.setAttributes( { call: value } );
						},
						placeholder: __( 'button' ), 
					});
				}
			}
			function getSub() {
				if( props.isSelected || attributes.meta ) {
					return el( blockEditor.RichText, {
						tagName: 'div',
						className: 'sub',
						value: attributes.meta,
						allowedFormats: [ 'core/bold', 'core/italic', 'core/subscript', 'core/superscript', 'core/strikethrough' ],
						onChange: function( value ) {
							props.setAttributes( { meta: value } );
						},
						placeholder: __( 'meta data' ), 
					});
				}
			}
			function getLink() {
				if( props.isSelected ) {
					return el( 'div', { className: 'link' }, 
						wp.element.createElement( wp.blockEditor.URLInputButton, {
							link: attributes.link,
							onChange: function( value, post ) {
								props.setAttributes( { link: value, text: (post && post.title) || 'Click here' } );
							}
						}),
						el( blockEditor.RichText, {
							tagName: 'h2',
							className: 'title',
							value: attributes.title,
							allowedFormats: [ 'core/bold', 'core/italic', 'core/subscript', 'core/superscript', 'core/strikethrough' ],
							onChange: function( value ) {
								props.setAttributes( { title: value } );
							},
							placeholder: __( 'title' ), 
						})
					);
				} else {
					return el( 'a', { className: 'link' }, 
						el( 'h2', { className: 'title' }, attributes.title )
					);
				}
			}

			// console.log('edit', props);
			
			return el( 'div', Object.assign( blockProps ), 
				getLink(),
				el(
					'figure',
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
										: 'button button-large select-media',
									onClick: obj.open,
								},
								! attributes.mediaID
									? __( 'Add media', 'flair' )
									: el( 'img', { src: attributes.mediaURL, alt: attributes.mediaAlt } )
							);
						},
					})
				),
				getSub(),
				el( RichText, {
					tagName: 'div',
					className: 'excerpt',
					value: attributes.excerpt,
					onChange: function( val ) {
						props.setAttributes( { excerpt: val } ); // Store updated content as a block attribute
					},
					placeholder: __( 'your description...' ), // Display this text before any content has been added by the user
				}),
				getCall(),
			);

		},


		save: function( props ) {

			var attributes = props.attributes;
			
			function getMedia() {
				if ( !! attributes.mediaURL ) {
					return el( 'figure', { className: 'media' }, 
						el( 'img', { src: attributes.mediaURL, alt: attributes.mediaAlt }),
					);
				}
			};
			function getSub() {
				if ( !! attributes.meta ) {
					return el( RichText.Content, {
						tagName: 'div',
						className: 'sub',
						value: attributes.meta
					})
				}
			};
			function getExcerpt() {
				if ( !! attributes.excerpt ) {
					return el( RichText.Content, {
						tagName: 'div',
						className: 'excerpt',
						value: attributes.excerpt
					});
				}
			};
			function getButton() {
				if ( !! attributes.call ) {
					return el( RichText.Content, {
						tagName: 'div',
						className: 'call',
						value: attributes.call
					})
				}
			};

			
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
				getMedia(),
				getSub(),
				getExcerpt(),
				getButton()
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

