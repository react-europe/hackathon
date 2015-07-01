webpackConfig = require './webpack.config'

module.exports = (config) -> config.set
	basePath: ''

	frameworks: ['mocha', 'chai']

	files: [
		'./node_modules/phantomjs-polyfill/bind-polyfill.js'
		'./node_modules/react/dist/react-with-addons.js'
		'./test-runner.js'
	]

	coffeePreprocessor:
		options:
			sourceMap: true

	preprocessors:
		'test-runner.js': ['webpack']

	webpack: webpackConfig
		devTool: 'inline-source-map'

	webpackMiddleware:
		stats:
			colors: true
		quiet: true

	port: 9876
	colors: true
	autoWatch: true
	singleRun: false
	logLevel: config.LOG_INFO

	browsers: ['PhantomJS']

	browserNoActivityTimeout: 40e3

	reporters: ['mocha', 'coverage']
	mochaReporter:
		output: 'minimal'

	plugins: [
		'karma-webpack'
		'karma-chai'
		'karma-coverage'
		'karma-mocha'
		'karma-mocha-reporter'
		'karma-chrome-launcher'
		'karma-firefox-launcher'
		'karma-phantomjs-launcher'
	]
