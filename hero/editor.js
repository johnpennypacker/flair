(function ( blocks, element, blockEditor, components, data, i18n ) {
	
	var el = element.createElement,
		registerBlockType = blocks.registerBlockType,
		useBlockProps = blockEditor.useBlockProps,
		__ = i18n.__,
		InnerBlocks = blockEditor.InnerBlocks,
		Button = components.Button,
		ButtonGroup = components.ButtonGroup,
		SelectControl = components.SelectControl,
		ToggleControl = components.ToggleControl,
		TextControl = components.TextControl,
		TextareaControl = components.TextareaControl,
		PanelBody = components.PanelBody,
		PanelRow = components.PanelRow,

		BlockAlignmentMatrixControl = components.__experimentalAlignmentMatrixControl,
		//FullHeightAlignmentControl = components.FullHeightAlignmentControl,

		FocalPointPicker = components.FocalPointPicker,
		ColorPalette = components.ColorPalette,
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
	
	function bgMedia( props ) {
		var els = [];
		if( props.attributes.mediaURL ) {
			els.push( el( "figure", {
				className: "image",
				}, el( "img", {
					"src": props.attributes.mediaURL,
					"alt": props.attributes.mediaAlt,
					"style": { 
						'--originX': ( props.attributes.focalPoint.x * 100 ) + "%",
						'--originY': ( props.attributes.focalPoint.y * 100 ) + "%",
						objectPosition: bgPosition( props.attributes.focalPoint )
					}
				} )
			));
		}
		if( props.attributes.videoURL ) {
			els.push( el( "figure", {
				className: "video",
				}, el( "video", {
					"src": props.attributes.videoURL,
					"autoplay": "autoplay",
					"loop": "loop"
				} )
			));
		}
		return els;
		
	}

	function getBg( props, context ) {

		var styles = { };
		if( props.attributes.bgColor ) {
			styles.backgroundColor = props.attributes.bgColor;
		}
		if( props.attributes.mediaURL ) {
			styles.backgroundImage = "url(" + props.attributes.mediaURL + ")";
			styles.backgroundPosition = bgPosition( props.attributes.focalPoint );
		}
		
		var children = [];
		if( "edit" == context ) {
			children.push( el( "div", { className: "color-picker column-width" }, colorPicker( props ) ) );
		}
		children.push( bgMedia( props ) );

		var bg = el( "div", {
			className: "background",
			style: styles,
			}, children
		);
		
		return bg;

	}

	function defaultTemplate() {
		return [
			 [ 'core/group', {"layout":{"type":"flex","orientation":"vertical","verticalAlignment":"center"}}, [
			 [ 'flair/eyebrow', { content: "There goes" } ],
			 [ 'core/heading', { level: 3, placeholder: "My hero." } ],
			 [ 'core/paragraph', { "fontSize":"large", placeholder: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce elit dolor, bibendum vel risus eu, semper imperdiet justo."} ]
			 ]],
		];
	}
	
	function getClassNames( atts ) {
		var classes = [ "hero", "flair-io" ];
		if( atts.mediaURL ) {
			classes.push( "has-media" );
		}
		if( atts.bgColor ) {
			classes.push( "has-bg-color" );
		}
		if( atts.style ) {
			classes.push( atts.style );
		}
		if( atts.contentPosition ) {
			var map = {
				"top left": "nw",
				"top center": "n",
				"top right": "ne",
				"center left": "w",
				"center center": "center-center",
				"center right": "e",
				"bottom left": "sw",
				"bottom center": "s",
				"bottom right": "se",
			}
			classes.push( map[atts.contentPosition] );
		}
		return classes;
	}

	function colorPicker( props ) {
		return el( ColorPalette, {
			label: __( "Background color" ),
			colors: [
				{ name: 'Silver', color: 'silver' },
				{ name: 'White', color: '#fff' },
				{ name: 'Gray', color: 'gray' },
			],
			disableCustomColors: false,
			enableAlpha: true,
			value: props.attributes.bgColor,
			onChange: function( v ) {
				props.setAttributes( { bgColor: v } );
			}
		})
	}


	blocks.registerBlockType( "flair/hero", {
	
		icon: el("svg", { width: 24, height: 24 },
			el("path", { 
				d: "M1,1v18.3h21.9V1C22.9,1,1,1,1,1z M21.1,17.1H2.9V2.9h18.3V17.1z", fill: "#2f2f2f"
			}),
			el("rect", { 
				x: "5.6", y: "20", width: "12.7", height: "2.3", fill: "#2f2f2f" 
			}),
			el("path", { 
				d: "M6.9,16H4v-4.2c0,0,0.7-0.1,1.4-0.5c0.9-0.4,1.4-1,1.4-1V16z", fill: "#2f2f2f"
			}),
			el("path", { 
				d: "M17.1,16H20v-4.2c0,0-0.7-0.1-1.4-0.5c-0.9-0.4-1.4-1-1.4-1V16z", fill: "#2f2f2f"
			}),
			el("path", { 
				d: "M15.7,4L15.7,4H8.3l0,0H4v6.8c2.2-0.4,4.3-2.7,5.1-5.5c0.2,0.1,0.4,0.1,0.6,0.1c0.5,0,0.9-0.2,1.1-0.6 c0.3,0.3,0.7,0.6,1.1,0.6s0.9-0.2,1.1-0.6c0.3,0.3,0.7,0.6,1.1,0.6c0.2,0,0.4-0.1,0.6-0.1c0.8,2.8,2.9,5.1,5.1,5.5V4H15.7z", fill: "#2f2f2f"
			}),
		),

		edit: function( props ) {

			var classes = getClassNames( props.attributes );
			
			function hasInnerBlocks() {
				useSelect(
					( select ) => select( blockEditor.store ).getBlock( props.clientId ).innerBlocks.length > 0, [ props.clientId ]
				);
			}
			
			function sideBarControls() {
			
				var focalPicker, clearButton, videoField, stylePicker, altField, captionField;
				if( props.attributes.mediaURL ) {
					focalPicker = el( FocalPointPicker, {
						label: __( "Focal Point" ),
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
									caption: undefined,
									focalPoint: undefined
								} );
							}
						}, __( "Clear Media" ));
				}
				
				stylePicker = el( ButtonGroup, {
						className: "style",
						label: __( "Style" )
					},
					el( Button, {
						disabled: ( ! props.attributes.mediaURL ),
						isPressed: ( props.attributes.style == "horizontal"),
						onClick: function ( v ) { props.setAttributes( { style: "horizontal" } ) },
						size: "small",
						variant: "secondary"
					}, "Horizontal" ),
					el( Button, {
						disabled: ( ! props.attributes.mediaURL ),
						isPressed: ( props.attributes.style == "vertical"),
						onClick: function ( v ) { props.setAttributes( { style: "vertical" } ) },
						size: "small",
						variant: "secondary"
					}, "Vertical" ),
			 	);
				
				altField = el( TextControl, {
					label: __( "Alt text" ),
					type: "text",
					value: props.attributes.mediaAlt,
					onChange: function( v ) {
						props.setAttributes( { mediaAlt: v } );
					}
				});

				captionField = el( TextareaControl, {
					label: __( "Caption" ),
					type: "text",
					value: props.attributes.caption,
					onChange: function( v ) {
						props.setAttributes( { caption: v } );
					}
				});

				videoField = el( TextControl, {
					label: __( "Video URL" ),
					type: "text",
					value: props.attributes.videoURL,
					onChange: function( v ) {
						props.setAttributes( { videoURL: v } );
					}
				});

				return el( InspectorControls, { 
					key: "group",
					},
					el( PanelBody, {
							title: __( "Hero options" ),
							initialOpen: true
						},
						el( PanelRow, { className: "style" }, stylePicker ),
						focalPicker,
						el( PanelRow, { className: "clear-media" }, clearButton ),
						el( PanelRow, { className: "color-picker" }, colorPicker( props ) ),
						el( PanelRow, { className: "alt-field" }, altField ),
						el( PanelRow, { className: "caption-field" }, captionField ),
						el( PanelRow, { className: "video-field" }, videoField )
						
					) // end PanelBody
				); //end InspectorControls

			};

			function blockControls() {

				return el( BlockControls, {
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
								mediaURL: v.url,
								caption: v.caption
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
					}),
					el( BlockAlignmentMatrixControl, {
							label: __( "Change content position" ),
							value: props.attributes.contentPosition,
							defaultValue: "bottom center",
							width: 48,
							onChange: function ( v ) {
								props.setAttributes( { 
									contentPosition: v
								} );
							},
	 						isDisabled: ! hasInnerBlocks
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
					el( "header", {
						},
						getBg( props, "edit" ),
						el( "div", {
							className: "foreground"
							},
							el( InnerBlocks, {
								template: defaultTemplate()
							})
						)
					),
					el( blockEditor.RichText, {
						tagName: "p",
						className: "caption",
						value: props.attributes.caption,
						allowedFormats: [ 'core/bold', 'core/italic', 'core/subscript', 'core/superscript', 'core/strikethrough' ],
						onChange: function( v ) {
							props.setAttributes( { caption: v } );
						},
						placeholder: __( 'caption' ), 
					})
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
			return el(
				'div',
				useBlockProps.save({
					className: classes.join( " " ),
        }),
					el( "header", {
						},
					getBg( props, "save" ),
					el( "div", {
							className: "foreground"
						},
						el( InnerBlocks.Content )
					)
				),
				el( "p", { className: "caption" }, props.attributes.caption )
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

