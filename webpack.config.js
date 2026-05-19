// Import the original config from the @wordpress/scripts package.
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');


const path = require( 'path' );

// Export the webpack config.

// the way I am faking custom output dirs is to make the object property names the output path...
module.exports = {
	...defaultConfig,
	entry: {
	  ...defaultConfig.entry(),
		'fadie/variation': '/src/fadie/variation.js',
		'fadie/frontend': '/src/fadie/frontend.scss',
		'fadie/editor': '/src/fadie/editor.scss',

		'fixie/variation': '/src/fixie/variation.js',
		'fixie/frontend': '/src/fixie/frontend.scss',
		'fixie/editor': '/src/fixie/editor.scss',

		'flair-core/frontend': '/src/flair-core/flair-front.scss',
		'flair-core/flair': '/src/flair-core/flair.js',
		'flair-core/flair-editor': '/src/flair-core/flair-editor.js',

		'iconic/iconic': '/src/iconic/iconic.scss',

		'kinetic/kinetic-styles': '/src/kinetic/frontend.scss',
		'kinetic/kinetic': '/src/kinetic/kinetic.js',

		'zoomer/zoomer-styles': '/src/zoomer/zoomer.scss',
		'zoomer/zoomer': '/src/zoomer/zoomer.js'

	},
	plugins: [
	  ...defaultConfig.plugins,
    new RemoveEmptyScriptsPlugin(),
  ]
};
