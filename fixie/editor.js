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

	blocks.registerBlockType( "flair/fixie", {
	
		icon: el("svg", { width: 24, height: 24 },
			el("rect", { 
				x: "1", y: "1", width: "22", height: "22", fill: "#2f2f2f"
			}),
			el("rect", { 
				x: "3", y: "3", width: "18", height: "10", fill: "#fff" 
			}),
			el("rect", { 
				x: "7", y: "15", width: "1", height: "2", fill: "#fff"
			}),
			el("rect", { 
				x: "12", y: "15", width: "1", height: "4", fill: "#fff"
			}),
			el("rect", { 
				x: "17", y: "15", width: "1", height: "6", fill: "#fff"
			}),
		),

		edit: function( props ) {

			var classes = [ 'fixie', 'flair-io' ];

			return el(
				'div',
				useBlockProps({
					className: classes.join(' '),
        }),
				el( 'div', {
					className: 'background'
					}
				),
				el( 'div', {
					className: 'foreground'
					},
					el( InnerBlocks )
				)

			);
		},
		
		save: function( props ) {
			var classes = [ 'fixie', 'flair-io' ];

			return el(
				'div',
				useBlockProps.save({
					className: classes.join(' '),
        }),
				el( 'div', {
					className: 'background'
					}
				),
				el( 'div', {
						className: 'foreground'
					},
					el( InnerBlocks.Content)
				)
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

