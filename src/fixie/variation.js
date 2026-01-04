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
			className: 'flair-fixie'
		},
		scope: ['inserter'],
		icon: {
			src: (<svg viewBox="0 0 24 24">
				<rect x="1" y="1" width="22" height="22" fill="rgb(47,47,47)"/>
				<rect x="3" y="3" width="18" height="8" fill="white"/>
				<rect x="6" y="13" width="1" height="3" fill="white"/>
				<rect x="11" y="13" width="1" height="5" fill="white"/>
				<rect x="16" y="13" width="1" height="7" fill="white"/>
			</svg>)
		},
		isActive: ['className']
	}
);
