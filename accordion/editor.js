(function ( blocks, element, blockEditor, components, i18n ) {
	
	var el = element.createElement,
		registerBlockType = blocks.registerBlockType,
		useBlockProps = blockEditor.useBlockProps,
		__ = i18n.__,
		InnerBlocks = blockEditor.InnerBlocks,
		SelectControl = components.SelectControl,
		ToggleControl = components.ToggleControl,
		InspectorControls = blockEditor.InspectorControls,
		PanelBody = components.PanelBody;

	blocks.registerBlockType( "flair/accordion", {
	
		icon: el("svg", { width: 24, height: 24 },
			el("rect", { 
				x: "1", y: "1", width: "22", height: "22", fill: "#2f2f2f"
			}),
			el("rect", { 
				x: "2", y: "6", width: "20", height: "16", fill: "#fff" 
			}),
			el("rect", { 
				x: "2", y: "2", width: "16", height: "3", fill: "#fff"
			}),
			el("rect", { 
				x: "19", y: "2", width: "3", height: "3", fill: "#fff"
			}),
			el("rect", { 
				x: "4", y: "9", width: "14", height: "1", fill: "#2f2f2f"
			}),
			el("rect", { 
				x: "4", y: "12", width: "15", height: "1", fill: "#2f2f2f"
			}),
			el("rect", { 
				x: "4", y: "18", width: "11", height: "1", fill: "#2f2f2f"
			}),
			el("rect", { 
				x: "4", y: "15", width: "14", height: "1", fill: "#2f2f2f"
			})
		),

		supports: {
	    align: true
		},

		edit: function( props ) {

			var classes = [ 'flair-accordion', 'flair-io' ];

			return el(
				'div',
				useBlockProps({
					className: classes.join(' '),
        }),
				el( blockEditor.RichText, {
					tagName: 'h3',
					className: 'header',
					value: props.attributes.header,
					allowedFormats: [ 'core/bold', 'core/italic' ],
					onChange: function( v ) {
						props.setAttributes( { header: v } );
					},
					placeholder: __( 'Pane Title' ),
				}),
				el( 'div', {
					className: 'detail',
					},
					el( InnerBlocks ),
				)

			);
		},
		
		save: function( props ) {
			var classes = [ 'flair-accordion', 'flair-io' ];

			return el(
				'div',
				useBlockProps.save({
					className: classes.join(' '),
        }),
				el( blockEditor.RichText.Content, {
					tagName: 'h3',
					className: 'header',
					value: props.attributes.header,
				}),
				el( 'div', {
					className: 'detail',
				},
				el( InnerBlocks.Content )
				),
			);
		}


	});

})(
	window.wp.blocks,
	window.wp.element,
	window.wp.blockEditor,
	window.wp.components,
	window.wp.i18n
);

