// Import the original config from the @wordpress/scripts package.
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

const path = require( 'path' );

// Export the webpack config.

// the way I am faking custom output dirs is to make the object property names the output path...
module.exports = {
	...defaultConfig,
	entry: {
	    ...defaultConfig.entry(),
		'fixie/variation': '/src/fixie/variation.js',
		'fixie/style': '/src/fixie/frontend.scss',
		'fixie/editor': '/src/fixie/editor.scss'
	},
};