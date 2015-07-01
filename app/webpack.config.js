'use strict';

var baseConfig = require('./scripts/config/BaseConfig');
var path = require('path');
var _ = require('lodash');
var webpack = require('webpack');
var webpackCommon = require('../webpack.config');

module.exports = webpackCommon({
	resolve: {
		alias: {
			'app-theme': path.join(__dirname, '../common/styles/dark-theme')
		}
	},
	plugins: [
		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, new RegExp(_.pluck(baseConfig.languages, 'moment-key').join('|')))
	]
});
