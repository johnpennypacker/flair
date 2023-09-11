(function ( blocks, blockEditor, element, components, i18n ) {

	var el = element.createElement;
	var __ = i18n.__;
	var RichText = blockEditor.RichText;
	var MediaUpload = blockEditor.MediaUpload;

	var classes = 'card flair-io';
	
	blocks.registerBlockType( 'flair/card', {
	
		icon: el('svg', { width: 24, height: 24 },
			el('path', { 
				'd': 'M23.037,1.042l-22.037,0l0,22.03l22.037,-0l-0,-22.03Zm-1,1l-0,20.03c-0,-0 -20.037,-0 -20.037,-0c-0,-0 -0,-20.03 -0,-20.03l20.037,0Z'
			} ),
			el('path', { 
				'd': 'M23.037,1.042l-22.037,0l0,8.958l22.037,-0l-0,-8.958Zm-1,1l-0,6.958c-0,0 -20.037,0 -20.037,0c-0,-0 -0,-6.958 -0,-6.958l20.037,0Z'
			} ),
			el('path', { 
				'd': 'M1.26,2.771l21.411,6.631l0.296,-0.955l-21.411,-6.632l-0.296,0.956Z'
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
							url: attributes.link,
							href: attributes.link,
							placeholder: __( 'URL' ), 
							onChange: function( value ) {
								props.setAttributes( { link: value } );
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
					return el( 'a', { className: 'link', href: attributes.link }, 
						el( 'h2', { className: 'title' }, attributes.title )
					);
				}
			}

// 			 console.log('edit', props);
			
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

			
// 			 console.log('save', attributes);
		
			return el( 'div', { className: classes }, 
				el(
					'a',
					{ className: 'link', href: attributes.link }, 
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

