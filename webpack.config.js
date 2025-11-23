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
		'fixie/variation': '/src/fixie/variation.js',
		'fixie/frontend': '/src/fixie/frontend.scss',
		'fixie/editor': '/src/fixie/editor.scss',

		'iconic/iconic': '/src/iconic/iconic.scss',

		'zoomer/zoomer-styles': '/src/zoomer/zoomer.scss',
		'zoomer/zoomer': '/src/zoomer/zoomer.js'
	},
	plugins: [
	  ...defaultConfig.plugins,
    new RemoveEmptyScriptsPlugin(),
  ]
};
