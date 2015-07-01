# This is an abstraction over jquery.ajax.
# It was created to mainly help the actionRouter to communicate with the server.
$ = require 'jquery'

ajaxHelper = (paramObject) ->
	{verb, baseUrl, url, headers, data, transactFns, dataPath, flagPath, successCallback, errorCallback} = paramObject
	if flagPath? then	transactFns.set flagPath, {state: 'waiting'}
	$.ajax
		type: verb
		dataType: 'jsonp'
		url: baseUrl + url
		data: data
		headers: headers
		# headers:
		# 	'Webpunch-App-Version': '666.666'
		success:
			(data) ->
				if flagPath? then transactFns.set flagPath, {state: 'success'}
				if dataPath? then transactFns.set dataPath, data
				if successCallback then successCallback(data)
		error:
			(xhr) ->
				if xhr.status == 401
					app = require '../base/Application'
					app.functions.authentication.removeAuthenticationCookie()
				else
					if flagPath? then transactFns.set flagPath, {state: 'error', statusCode: xhr.status, statusText: xhr.statusText, data: xhr.responseJSON }

					if errorCallback then errorCallback(xhr)


restHelper = (transactFns, baseUrl, headers) ->
	get: (url, dataPath, flagPath, success) ->
		ajaxHelper
			verb: 'GET'
			baseUrl: baseUrl
			headers: headers
			url: url
			transactFns: transactFns
			dataPath: dataPath
			flagPath: flagPath
			successCallback: success
	post: (url, dataPath, flagPath, data, success) ->
		ajaxHelper
			verb: 'POST'
			baseUrl: baseUrl
			headers: headers
			url: url
			data: data
			transactFns: transactFns
			dataPath: dataPath
			flagPath: flagPath
			successCallback: success
	put: (url, dataPath, flagPath, data, success) ->
		ajaxHelper
			verb: 'PUT'
			baseUrl: baseUrl
			headers: headers
			url: url
			data: data
			transactFns: transactFns
			dataPath: dataPath
			flagPath: flagPath
			successCallback: success

xhr =
	ajaxHelper: ajaxHelper
	restHelper: restHelper

window.xhr = xhr
module.exports = xhr
