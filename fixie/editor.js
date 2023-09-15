(function ( blocks, element, blockEditor, components, data, i18n ) {
	
	var el = element.createElement,
		registerBlockType = blocks.registerBlockType,
		useBlockProps = blockEditor.useBlockProps,
		__ = i18n.__,
		InnerBlocks = blockEditor.InnerBlocks,
		Button = components.Button,
		SelectControl = components.SelectControl,
		ToggleControl = components.ToggleControl,
		PanelBody = components.PanelBody,
		PanelRow = components.PanelRow,
		BlockAlignmentMatrixControl = components.BlockAlignmentMatrixControl,
		FullHeightAlignmentControl = components.FullHeightAlignmentControl,
		FocalPointPicker = components.FocalPointPicker,
		BlockControls = blockEditor.BlockControls,
		InspectorControls = blockEditor.InspectorControls,
		MediaReplaceFlow = blockEditor.MediaReplaceFlow,
		MediaUpload = blockEditor.MediaUpload,
		useSelect = data.useSelect;

		function bgPosition( fp ) {
			if( ! fp ) {
				return undefined;
			} 
			return (fp.x * 100) + "% " + (fp.y * 100) + "%";
		}

		function bgStyles( atts ) {

			var styles = { };
			if( atts.mediaURL ) {
				styles.backgroundImage = "url(" + atts.mediaURL + ")";
				styles.backgroundPosition = bgPosition( atts.focalPoint );
			}
			return styles;
		}
		
		function getClassNames( atts ) {
			var classes = [ 'fixie', 'flair-io' ];
			if( atts.mediaURL ) {
				classes.push('has-media');
			}
			return classes;
		}

	

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

			var classes = getClassNames( props.attributes );
			
			console.log("edit props", props.attributes );
			console.log("edit bg", bgStyles( props.attributes ) );

			function hasInnerBlocks() {
				useSelect(
					( select ) =>
						select( blockEditor.store ).getBlock( props.clientId ).innerBlocks.length >
						0,
					[ props.clientId ]
				);
			}
			
			
			
			function sideBarControls() {
			
				var focalPicker, clearButton;
				if( props.attributes.mediaURL ) {
					focalPicker = el( FocalPointPicker, {
						label: __( 'Focal Point' ),
						url: props.attributes.mediaURL,
						value: props.attributes.focalPoint,
						// help: __( 'Select the marker style.' ),
						onChange: function( v ) {
							props.setAttributes( { focalPoint: v } );
						}
					});
					clearButton = el( Button, {
							variant: "secondary",
							isSmall: true,
							className: "block-library-cover__reset-button",
							onClick: function( v ) {
								props.setAttributes( {
									mediaId: undefined,
									mediaAlt: undefined,
									mediaURL: undefined,
									focalPoint: undefined
								} );
							}
						}, __("Clear Media"));
				}

				return el( InspectorControls, { 
					key: 'group',
					},
					el( PanelBody, {
							title: __('Fixie options'),
							initialOpen: true
						},
						focalPicker,
						el( PanelRow, { }, clearButton )
					) // end PanelBody
				); //end InspectorControls

			};

			function blockControls() {

				return el( BlockControls, {
						group: "block"
					},
					el( BlockAlignmentMatrixControl, {
							label: __( "Change content position" ),
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
						allowedTypes: [ "image", "video" ],
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
						name: ! props.attributes.mediaURL ? __( "Add Media" ) : __( "Replace" )
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
					"div",
					useBlockProps({
						className: classes.join( " " ),
					}),
					el( "div", {
						className: "background",
						style: bgStyles( props.attributes )
						}
					),
					el( "div", {
						className: "foreground"
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
			var classes = getClassNames( props.attributes );

			console.log("save atts", props.attributes);
			
			console.log("save bg", bgStyles( props.attributes ) );
			
			return el(
				'div',
				useBlockProps.save({
					className: classes.join( " " ),
        }),
				el( "div", {
					className: "background",
					style: bgStyles( props.attributes )
					}
				),
				el( "div", {
						className: "foreground"
					},
					el( InnerBlocks.Content )
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

