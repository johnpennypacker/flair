(function ( blocks, blockEditor, element, components, i18n ) {

	var el = element.createElement;
	var __ = i18n.__;
	var BlockControls = blockEditor.BlockControls;
	var AlignmentToolbar = blockEditor.AlignmentToolbar;

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
			
			return el(
					'div',
					blockProps,
					el(
							BlockControls,
							{ key: 'controls' },
							el( AlignmentToolbar, {
								value: props.attributes.alignment,
								onChange: function( v ) {
									props.setAttributes( { alignment: v === undefined ? 'none' : v } )
								},
							})
					),
					el( blockEditor.RichText, {
							key: 'content',
							style: { textAlign: props.attributes.alignment },
							tagName: 'p',
							className: 'eyebrow flair-io',
							value: props.attributes.content,
							allowedFormats: [ 'core/bold', 'core/italic', 'core/subscript', 'core/superscript' ],
							onChange: function( v ) {
								props.setAttributes( { content: v } ); 
							},
							placeholder: __( 'Eyebrow text...' ),
					} )
			);
		},
		
		/**
		 * this is what gets saved to the database and displayed on pages
		 */
		save: function( props ) {
			var blockProps = blockEditor.useBlockProps.save();

			var classes = 'eyebrow flair-io';
// 			if( props.attributes.alignment )  {
// 				classes.push()
// 			}
					
			return el( blockEditor.RichText.Content, blockEditor.useBlockProps.save( {
				tagName: 'p',
				className: classes,
				style: { textAlign: props.attributes.alignment },
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

