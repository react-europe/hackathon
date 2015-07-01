# app = require './Application' # this is a cyclic dep. Figure out a better way to restructure this
xhr = require '../common/xhr'
LocalStorage = require 'qcommon/utils/local-storage'

# TODO: see comment above, we have a cyclic dep to app. We need to restructure this (and some other stuff) in a better way
_loginSuccess = (data) ->
	console.info 'Login success'
	document.cookie = 'hack.authenticated=1'
	LocalStorage.setObject 'hack_auth', data

	app = require('./Application')
	app.actions.tracking.login()
	app.forceUpdate()

_loginError = ->
	console.info 'Login error'
	LocalStorage.removeObject 'hack_auth'
	document.cookie = 'hack.authenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
	app = require('./Application')
	app.actions.tracking.loginError()
	app.forceUpdate()

_logoutSuccess = ->
	document.cookie = 'hack.authenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
	console.info 'Logout success'
	LocalStorage.removeObject 'hack_auth'

	app = require('./Application')
	app.actions.tracking.logout()
	app.forceUpdate()

_logoutError = (res) ->
	console.info 'Logout error'
	app = require('./Application')
	app.actions.tracking.logoutError()

_baseParams = (baseUrl, transactFn, url, dataPath, flagPath, data) ->
	verb: 'POST'
	baseUrl: baseUrl
	url: url
	data: data
	transactFns: transactFn
	dataPath: dataPath
	flagPath: flagPath

isLoggedIn = ->
	app = require('./Application')
	app.state.auth? and
	(document?.cookie?.indexOf('hack.authenticated=1') > -1 or document?.cookie?.indexOf('wpQuinyxAuthToken') > -1)

removeAuthenticationCookie = ->
	document.cookie = 'hack.authenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
	app.forceUpdate()

fakeLogin = ->
	document?.cookie = 'hack.authenticated=1'


login = (baseUrl, transactFn) -> (url, dataPath, flagPath, data) ->
	params = merge _baseParams(baseUrl, transactFn, url, dataPath, flagPath, data),
		successCallback: _loginSuccess
		errorCallback: _loginError
	xhr.ajaxHelper params

logout = (baseUrl, transactFn) -> (url, dataPath, flagPath, data) ->
	params = merge _baseParams(baseUrl, transactFn, url, dataPath, flagPath, data),
		successCallback: _logoutSuccess
		errorCallback: _logoutError
	xhr.ajaxHelper params

autoLoginWithUnitId = -> throw new Error 'Not yet implemented'
autoLogin = (baseUrl, transactFn) -> (url, dataPath, flagPath, data) ->
	# Test with /?autoLogin=true&autoLoginUnitId=1009&autoLoginHost=10+1+200+81
	params = merge _baseParams(baseUrl, transactFn, url, dataPath, flagPath, data),
		successCallback: _loginSuccess
		errorCallback: _loginError
	xhr.ajaxHelper params


Authentication = (transactFn, baseUrl) -> {
	login: login(baseUrl, transactFn)
	logout: logout(baseUrl, transactFn)
	autoLoginWithUnitId: autoLoginWithUnitId
	autoLogin: autoLogin(baseUrl, transactFn)
	isLoggedIn
	fakeLogin
	removeAuthenticationCookie
}

module.exports = Authentication
