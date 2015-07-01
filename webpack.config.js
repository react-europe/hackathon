'use strict';

var path = require('path');
var _ = require('lodash');
var webpack = require('webpack');
var RHLMatches = /--view|viewcomponents|\.view|views\//;

var webpackConfig = {
	devtool: 'eval',
	watch: true,
	cache: true,
	output: {
		path: path.join(__dirname, 'app/'),
		publicPath: '/',
		filename: '[name]-bundle.js',
		chunkFilename: '[chunkhash].js'
	},
	module: {
		preLoaders: [
			{ test: /\.js$/, loader: 'eslint', exclude: /node_modules/ }
		],
		loaders: [
			{	test: /\.coffee$/, loader: 'coffee', exclude: RHLMatches },
			{	test: RHLMatches,	loaders: ['react-hot', 'coffee'],	exclude: /\.(scss|js)$/ },
			{	test: /\.js$/, loader: 'babel?optional[]=runtime&stage=0', exclude: /node_modules/ },
			{	test: RHLMatches, loaders: ['react-hot', 'babel?optional[]=runtime&stage=0'], exclude: /\.(scss|coffee)$/ },
			{ test: /\.scss$/, loaders: [
				'style',
				'css',
				'autoprefixer?{browsers:["last 2 version", "ie 10", "Android 4"]}',
				'sass'
			]},
			{ test: /\.woff$/, loader: 'url?prefix=font/&limit=5000&mimetype=application/font-woff' },
			{ test: /\.ttf$|\.eot$/, loader: 'file?prefix=font/' },
			{ test: /\.json$/, loader: 'json' },
			{ test: /\.svg$/, loaders: ['raw', 'svgo'] }
		]
	},
	resolve: {
		alias: {
			'elements': 'react-coffee-elements',
			'underscore': 'lodash',
			'app-theme': path.join(__dirname, 'common/styles/light-theme'),
			'qconfig': path.join(__dirname, 'config.common'),
			'qcommon': path.join(__dirname, 'common'),
			'qshift': path.join(__dirname, 'components/shift'),
			'qemployee': path.join(__dirname, 'components/employee'),
			'qinsights': path.join(__dirname, 'components/insights'),
			'qorganisation': path.join(__dirname, 'components/organisation'),
			'qgroup': path.join(__dirname, 'components/group'),
			'qtimeperiod': path.join(__dirname, 'components/timeperiod'),
			'qtimestamp': path.join(__dirname, 'components/timestamp')
		},
		extensions: ['', '.webpack.js', '.web.js', '.js', '.view.coffee', '.coffee', '.json', '.jsx'],
		modulesDirectories: ['node_modules', 'scripts', 'bower_components', 'web_modules']
	},
	plugins: [
		new webpack.ProvidePlugin({
			_: 'lodash',
			React: 'react'
		})
	]
};

module.exports = function(config) {
	return _.merge({}, webpackConfig, config, function(a, b) {
		return _.isArray(a) ? a.concat(b) : undefined;
	});
};
