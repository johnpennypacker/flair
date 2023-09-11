(function ( blocks, blockEditor, element, components, i18n ) {

	var el = element.createElement;
	var __ = i18n.__;
	var BlockControls = blockEditor.BlockControls;
	var AlignmentToolbar = blockEditor.AlignmentToolbar;

	blocks.registerBlockType( "flair/metric", {
	
		icon: el("svg", { width: 24, height: 24 },
			el("rect", { 
				x: "2", y: "16", width: "20", height: "2", fill: "#2f2f2f"
			}),
			el("rect", { 
				x: "2", y: "20", width: "20", height: "2", fill: "#2f2f2f"
			}),
			el("path", { 
				fill: "#2f2f2f", d: "M17,7V5h-2V3h-2v2h-2V3H9v2H7v2h2v2H7v2h2v2h2v-2h2v2h2v-2h2V9h-2V7H17z M13,9h-2V7h2V9z"
			})
		),


		edit: function( props ) {
		
			var blockProps = wp.blockEditor.useBlockProps({
				className: "metric flair-io",
				style: { textAlign: props.attributes.alignment },
			});
			
			return el(
					'div',
					blockProps,
					el(
						BlockControls,
						{ key: "controls" },
						el( AlignmentToolbar, {
							value: props.attributes.alignment,
							onChange: function( v ) {
								props.setAttributes( { alignment: v === undefined ? "center" : v } )
							},
						})
					),
					el( blockEditor.RichText, {
							key: "number",
							allowedFormats: [ "core/link" ],
							className: ( ! props.attributes.number ) ? "is-empty" : "",
							disableLineBreaks: true,
							tagName: "em",
							value: props.attributes.number,
							onChange: function( v ) {
								props.setAttributes( { number: v } ); 
							},
							placeholder: __( "100%" ),
					} ),
					el( blockEditor.RichText, {
							key: "qualifier",
							allowedFormats: [ "core/link", "core/bold", "core/italic", "core/subscript", "core/superscript" ],
							className: ( ! props.attributes.qualifier ) ? "is-empty qualifier" : "qualifier",
							disableLineBreaks: true,
							tagName: "span",
							value: props.attributes.qualifier,
							onChange: function( v ) {
								props.setAttributes( { qualifier: v } ); 
							},
							placeholder: __( "awesome" ),
					} )
			);
		},
		
		/**
		 * this is what gets saved to the database and displayed on pages
		 */
		save: function( props ) {
			var blockProps = blockEditor.useBlockProps.save();
		
			var classes = "metric flair-io";
								
			return el( "div", blockEditor.useBlockProps.save( {
					className: classes,
					style: { textAlign: props.attributes.alignment },
				}),
				el( blockEditor.RichText.Content, blockEditor.useBlockProps.save( {
					tagName: "em",
					value: props.attributes.number
				})),
				el( blockEditor.RichText.Content, blockEditor.useBlockProps.save( {
					tagName: "span",
					className: "qualifier",
					value: props.attributes.qualifier
				}))
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

