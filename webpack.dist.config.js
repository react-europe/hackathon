'use strict';

var webpack = require('webpack');

module.exports = {
	watch: false,
	output: {
		publicPath: '/'
	},
	plugins: [
		new webpack.ProvidePlugin({
			_: 'lodash',
			React: 'react'
		}),
		new webpack.DefinePlugin({
			// This has effect on the react lib size
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			},
			DEV: false
		}),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			},
			sourceMap: false,
			mangle: true
		}),
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb|sv/),
		new webpack.optimize.DedupePlugin()
	]
};
