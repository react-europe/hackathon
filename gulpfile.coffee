gulp = require 'gulp'
util = require 'gulp-util'
template = require 'gulp-template'
rename = require 'gulp-rename'
runSequence = require 'run-sequence'
webpack = require 'webpack'
fs = require 'fs'
del = require 'del'
path = require 'path'
_ = require 'lodash'
fileserver = require './fileserver.coffee'
theoHelper = require './common/theoHelper.coffee'

merge = (a, b) -> _.merge {}, a, b, (a, b) ->
	if _.isArray a then a.concat b else undefined

# variables
appName = util.env.app or 'app'
devPort = util.env.port
assets = "#{appName}/assets/*"
mainFile = path.join __dirname, "#{appName}/scripts/main.coffee"
buildFolder = util.env.target or "#{appName}/build"
devIndexHtml = "#{appName}/index.html"
distIndexHtml = "#{appName}/index.production.html"
distConfig = path.join __dirname, "#{appName}/config.dist"
distTag = if util.env.dev and util.env.tag then " - #{util.env.tag}" else ''

# private config
confFile = "#{appName}/assets/private-config.json"
if util.env.dev and not fs.existsSync confFile then fs.writeFileSync confFile, '{}'

# DEV
gulp.task 'default', ['app']
gulp.task 'app', ->	runSequence ['dev-clean'], ['dev-files'], ['app-server']

gulp.task 'dev-clean', (cb) ->	del [buildFolder], cb
gulp.task 'dev-files', ['dev-html', 'dev-assets']
gulp.task 'dev-html', -> gulp.src(devIndexHtml).pipe gulp.dest buildFolder
gulp.task 'dev-assets', -> gulp.src(assets, dot: true).pipe gulp.dest buildFolder

gulp.task 'app-server', -> fileserver 'app', buildFolder, devPort or '8000'

# DIST
gulp.task 'dist', (done) ->	runSequence ['dist-clean'], ['dist-files', 'theo', 'dist-server'], done

gulp.task 'dist-clean', (cb) ->	del [buildFolder], cb
gulp.task 'dist-files', ['dist-html', 'dist-assets']
gulp.task 'dist-html', ->
	gulp.src distIndexHtml
		.pipe template tag: distTag
		.pipe rename 'index.html'
		.pipe gulp.dest buildFolder
gulp.task 'dist-assets', -> gulp.src(assets, dot: true).pipe gulp.dest buildFolder

gulp.task 'dist-server', (done) ->
	appConfig = "./#{appName}/webpack.config.js"
	webpackConfig = if fs.existsSync appConfig then require appConfig else require('./webpack.config')()
	webpackConfig = merge (merge webpackConfig, require('./webpack.dist.config')),
		entry:
			quinyx: mainFile
		output:
			path: buildFolder
	if fs.existsSync distConfig then webpackConfig.resolve.alias.qconfig = distConfig
	webpackConfig.output.publicPath = ''
	webpack webpackConfig, (err, stats) ->
		if err then throw new util.PluginError 'webpack:build', err
		util.log '[webpack:build]', stats.toString {colors: true}
		done()

# THEO
gulp.task 'theo', ->
	{theo, props, dest} = theoHelper.get gulp
	console.log theo, props, dest
	gulp.src props
		.pipe theo.plugins.transform 'ownWeb'
		.pipe theo.plugins.format 'scss'
		.pipe gulp.dest dest
	gulp.src props
		.pipe theo.plugins.transform 'ownJs'
		.pipe theo.plugins.format 'js'
		.pipe gulp.dest dest
