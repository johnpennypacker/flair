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
			el("path", {
				d: "M21,10L23,16L21,16L23,22L4,22L1,13L3,13L1,7L3,7L1,1L20,1L23,10L21,10ZM4.108,10L5.442,14L20.225,14L18.892,10L4.108,10ZM18.558,3L3.775,3C3.775,3 5.442,8 5.442,8L20.225,8L18.558,3ZM4.108,16L5.442,20L20.225,20L18.892,16L4.108,16Z",
				fill: "#2f2f2f"
			})
		),

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

