(function ( blocks, element, blockEditor, components, data, i18n ) {
	
	var el = element.createElement,
		registerBlockType = blocks.registerBlockType,
		useBlockProps = blockEditor.useBlockProps,
		__ = i18n.__,
		InnerBlocks = blockEditor.InnerBlocks,
		SelectControl = components.SelectControl,
		ToggleControl = components.ToggleControl,
		PanelBody = components.PanelBody,
		BlockAlignmentMatrixControl = components.BlockAlignmentMatrixControl,
		FullHeightAlignmentControl = components.FullHeightAlignmentControl,
		FocalPointPicker = components.FocalPointPicker,
		BlockControls = blockEditor.BlockControls,
		InspectorControls = blockEditor.InspectorControls,
		MediaReplaceFlow = blockEditor.MediaReplaceFlow,
		MediaUpload = blockEditor.MediaUpload,
		useSelect = data.useSelect;
	

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
			if( props.attributes.mediaURL ) {
				classes.push('has-media');
			}

			const hasInnerBlocks = useSelect(
				( select ) =>
					select( blockEditor.store ).getBlock( props.clientId ).innerBlocks.length >
					0,
				[ props.clientId ]
			);
			
			function bgPosition(p) {
				if( ! p ) {
					return "";
				} 
				return (p.x * 100) + "% " + (p.y * 100) + "%"
			}

			
			
			function sideBarControls() {

				return el( InspectorControls, { 
					key: 'group',
					},
					el( PanelBody, {
						title: __('Fixie options'),
						initialOpen: true
					},
					el( FocalPointPicker, {
						label: __( 'Focal Point' ),
						url: props.attributes.mediaURL,
						value: props.attributes.marker,
						help: __( 'Select the marker style.' ),
						onChange: function( v ) {
							console.log(v);
							props.setAttributes( { marker: v } );
						}
					}),
					el( SelectControl, {
						label: __( 'Marker' ),
						options: [],
						value: props.attributes.marker,
						help: __( 'Select the marker style.' ),
						onChange: function( v ) {
							props.setAttributes( { marker: v } );
						}
					})

					) // end PanelBody
				); //end InspectorControls

			};

			function blockControls() {

				return el( BlockControls, {
						group: "block"
					},
					el( BlockAlignmentMatrixControl, {
							label: __( 'Change content position' ),
							value: props.attributes.contentPosition,
							onChange: function ( v ) {},
	// 						isDisabled: ! hasInnerBlocks
						})
				),
				el( BlockControls, {
						group: "other"
					}, 
					el( MediaReplaceFlow, {
						mediaId: props.attributes.mediaID,
						mediaURL: props.attributes.mediaURL,
						allowedTypes: [ 'image', 'video' ],
						accept: "image/*,video/*",
						onSelect: function (v) {
							props.setAttributes( { 
								mediaId: v.id,
								mediaAlt: v.alt,
								mediaURL: v.url
							} );
						},
						onToggleFeaturedImage: function (v) {},
						useFeaturedImage: function (v) {
							props.setAttributes( { 
								mediaId: v.id,
								mediaAlt: v.alt,
								mediaURL: v.url
							} );
						},
						name: ! props.attributes.mediaURL ? __( 'Add Media' ) : __( 'Replace' )
					})
// 					,
// 					el( FullHeightAlignmentControl, {
// 						isActive: false, //isMinFullHeight,
// 						onToggle: function( v ) {},
// 						isDisabled: ! hasInnerBlocks
// 					})
				);
			};
			
			function editBody() {
				return el(
					'div',
					useBlockProps({
						className: classes.join(' '),
					}),
					el( 'div', {
						className: "background",
						style: {
							backgroundColor: "pink",
							backgroundImage: "url(" + props.attributes.mediaURL + ")",
							backgroundPosition: bgPosition( props.attributes.marker )
							}
						}
					),
					el( 'div', {
						className: 'foreground'
						},
						el( InnerBlocks )
					)
				);
			};

			return [
				blockControls(),
				sideBarControls(),
				editBody()
			]
				
				
		}, // end edit
		
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
	window.wp.data,
	window.wp.i18n
);

