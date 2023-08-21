(function ( blocks, blockEditor, element, components, i18n ) {

	var el = element.createElement;
	var __ = i18n.__;

	blocks.registerBlockType( 'flair/eyebrow', {
	
		icon: el("svg", { width: 24, height: 24 },
			el("rect", { 
				x: "1", y: "3", width: "14", height: "2", fill: "#cc0000"
			}),
			el("rect", { 
				x: "1", y: "15", width: "22", height: "1", fill: "#2f2f2f" 
			}),
			el("rect", { 
				x: "1", y: "18", width: "22", height: "1", fill: "#2f2f2f"
			}),
			el("rect", { 
				x: "1", y: "21", width: "22", height: "1", fill: "#2f2f2f"
			}),
			el("rect", { 
				x: "1", y: "7", width: "22", height: "5", fill: "#2f2f2f"
			})
		),

		edit: function( props ) {
					
			var blockProps = wp.blockEditor.useBlockProps();
			var content = props.attributes.content;
			
			return el( blockEditor.RichText, {
				tagName: 'div',
				className: 'eyebrow flair-io',
				value: props.attributes.content,
				allowedFormats: [ 'core/bold', 'core/italic' ],
				onChange: function( content ) {
					props.setAttributes( { content: content } ); // Store updated content as a block attribute
				},
				placeholder: __( 'Eyebrow text...' ), // Display this text before any content has been added by the user
			});
		},
		
		/**
		 * this is what gets saved to the database and displayed on pages
		 */
		save: function( props ) {
			var blockProps = blockEditor.useBlockProps.save();

			var classes = 'eyebrow flair-io';
		
			return el( blockEditor.RichText.Content, blockEditor.useBlockProps.save( {
				tagName: 'div',
				className: classes,
				value: props.attributes.content
			}));
		}


	} );

})(
	window.wp.blocks,
	window.wp.blockEditor,
	window.wp.element,
	window.wp.components,
	window.wp.i18n
);

