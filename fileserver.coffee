portfinder = require 'portfinder'
express = require 'express'
webpack = require 'webpack'
WebpackDevServer = require 'webpack-dev-server'
http = require 'http'
bodyParser = require 'body-parser'
fs = require 'fs'

expandPath = (app, appPath) ->
	app.use express.static(appPath)
	app.set 'views', __dirname + '/' + appPath
	app.engine 'html', require('ejs').renderFile
	app.get '*', (req, res, next) ->
		url = req.url
		# the last section after '/' contains a dot, assume it has a file ending
		isFile = url.substring(url.lastIndexOf('/') + 1).indexOf('.') > -1
		if isFile	then next() else res.render 'index.html'

DevServer = (port, appName, appPath) ->
	appConfig = "./#{appName}/webpack.config.js"
	webpackConfig = if fs.existsSync appConfig then require appConfig else require('./webpack.config')()
	webpackConfig.entry =	main: [
		"webpack-dev-server/client?http://localhost:#{port}"
		'webpack/hot/only-dev-server'
		"./#{appName}/scripts/main.coffee"
	]
	webpackConfig.plugins.push new webpack.HotModuleReplacementPlugin()
	webpackConfig.plugins.push new webpack.DefinePlugin	DEV: true
	webpackConfig.devtool = 'eval'
	webpackConfig.debug = true

	server = new WebpackDevServer webpack(webpackConfig),
		contentBase: 'src'
		hot: true
		stats:
			assets: false
			colors: true
			version: false
			hash: false
			timings: false
			chunks: false
			chunkModules: false

	expandPath server.app, appPath

	server.listen port, (err, result) ->
		if err then console.error err
		console.info 'Listening at port ' + port

DevDataServer = (port) ->
	devDataFile = 'webpunch/devData.coffee'
	if not fs.existsSync devDataFile then fs.writeFileSync devDataFile, ''

	server = new express()

	server.all '*', (req, res, next) ->
		res.set 'Access-Control-Allow-Origin', req.headers.origin
		res.set 'Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Content-Length, Accept, Origin'
		res.set 'Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'
		res.set 'Access-Control-Allow-Credentials', 'true'
		res.set 'Access-Control-Max-Age', 5184000
		next()

	server.use bodyParser.json()

	server.post '/devData', (req, res) ->
		data = req.body
		sinceEpoch = (new Date()).getTime()
		data.dontTransactBefore = sinceEpoch + 5000
		dataStringJs = "var data = #{JSON.stringify(data)};"
		dataStringCoffee = js2coffee.build(dataStringJs, dataStringJs, {indent: '\t'})
		dataStringCoffee += '\nmodule.exports = data'
		fs.writeFile __dirname + devDataFile, dataStringCoffee, (err) ->
			if err then console.log err	else
				console.log 'The file was saved!'
				res.status(200).end()

	server.listen port

module.exports = (appName, appPath, basePort) ->
	portfinder.basePort = basePort
	portfinder.getPort (err, port) ->
		DevServer(port, appName, appPath)
