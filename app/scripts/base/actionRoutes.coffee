# These are routes for all actions in the application
# i.e. these are all the things you can do to mutate the data (global state) of the application

# This is an experimental concept, the idea is:
#	 - state mutation is the root of (almost) all evil
#	 - interaction with the server leading to state mutation is the root of the restOld of all the evil
#	 - by never allowing your application to either mutate data or talk to the server without going
#		 though the router we accomplish:
#			 1. we can log everything in the console to allow for easy debugging and understandning of the app
#			 2. all the things you can do in the app is automatically documented here!

# Tip: you can try these actions out in the browser console by typing:
# app.actions	- and you will get code-completion
# if you use and id path you type app.actions.employee.id(1048) and hit enter to see nested endpoints

xhr = require '../common/xhr'
helpers = require '../common/helpers'
Authentication = require './Authentication'
md5 = require 'blueimp-md5'

actionRoutes = (transactFn, baseApiUrl, headers, callback, apiKey) ->
	rest = xhr.restHelper transactFn, baseApiUrl, headers
	auth = Authentication(transactFn, baseApiUrl)

	mapToGetStr = (data) ->
		_.map data, (value, key) -> "#{key}=#{value}"
			.join '&'

	GET = (url, dataPath, flagPath, success) ->
		console.log 'apiKey', apiKey
		url = "#{url}&key=#{apiKey}"
		rest.get url, dataPath, 'api.' + flagPath, success

	POST = (url, dataPath, flagPath, data, success) ->
		rest.post url, dataPath, 'api.' + flagPath, data, success

	PUT = (url, dataPath, flagPath, data, success) ->
		rest.put url, dataPath, 'api.' + flagPath, data, success


	actions =
		api:
			groups:
				# get: (data) -> GET 'find/groups?&sign=true&photo-host=public&text=reactjs&radius=global&page=200', 'groups', 'groups'
				get: (data) -> GET '2/groups?&sign=true&photo-host=public&topic=reactjs&page=200', 'groups', 'groups'

		data:
			login:
				email:
					set: (str) -> transactFn.set 'login.email', str
				password:
					set: (str) -> transactFn.set 'login.password', str
				clear: (params, data) ->
					transactFn.set 'login.email', ''
					transactFn.set 'login.password', ''
			isLoggedIn: Authentication.isLoggedIn
			position: set: (obj) -> transactFn.set 'position', obj
			sorting: set: (obj) -> transactFn.set 'sorting', obj
			filterString: set: (val) -> transactFn.set 'filterString', val
			api:
				auth:
					login:
						clear: -> transactFn.set 'api.auth.login', {}
					logout:
						clear: -> transactFn.set 'api.auth.logout', {}
	if DEV
		actions.dev =
			api: {}

	return actions

module.exports = actionRoutes
