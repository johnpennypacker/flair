/**
 *
 */

const { registerBlockVariation } = wp.blocks;
const { __ } = wp.i18n;

registerBlockVariation(
    'core/cover', // Original block name
	{
		name: 'fixie',
		title: __('Fixie', 'flair'),
		description: __('A fullscreen fixed segment with scrolling foreground.', 'flair'),
		isDefault: false,
		category: 'flair',
		attributes: {
			className: 'flair-fixie',
			minHeight:100,
			minHeightUnit: "vh"
		},
		innerBlocks: [
			['core/group', {
				"style":{ "dimensions":{"minHeight":"150vh"} }, "layout":{"type":"flex","orientation":"vertical","verticalAlignment":"center"}
			}, [
					['core/paragraph', { "align":"center","placeholder":"Write title…" }]
				]
			]
		],
		scope: ['inserter'],
		icon: {
			src: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<rect fill="currentColor" x="4" y="4" width="16" height="16" />
				<path fill="#222" d="M3,22h18c.55,0,1-.45,1-1V3c0-.55-.45-1-1-1H3c-.55,0-1,.45-1,1v18c0,.55.45,1,1,1ZM20,4v16H4V4h16Z"/>
				<rect fill="#fff" x="4" y="6.5" width="16" height="8"/>
				<rect fill="#222" x="6" y="8" width="12" height="1"/>
				<rect fill="#222" x="6" y="10" width="12" height="1"/>
				<rect fill="#222" x="6" y="12" width="12" height="1"/>
				<rect fill="#fff" x="8" y="15.75" width="1" height="1.5"/>
				<rect fill="#fff" x="11.5" y="15.75" width="1" height="2.5"/>
				<rect fill="#fff" x="15" y="15.75" width="1" height="3.75"/>
			</svg>
			)
		},
		isActive: ( blockAttributes ) => {
			// check that the value exists; otherwise default covers break
			if( !! blockAttributes || !! blockAttributes.className ) { return }
			return blockAttributes.className.includes( 'flair-fixie' );
		}
	}
);
