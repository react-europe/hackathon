
Router = require 'react-router'

Route = React.createFactory Router.Route
DefaultRoute = React.createFactory Router.DefaultRoute
NotFoundRoute = React.createFactory Router.NotFoundRoute

AppView = require './AppView'
AuthenticatedView = require '../views/pages/AuthenticatedView'
LoginView = require '../views/pages/LoginView'
HomeView = require '../views/pages/HomeView'
NotFoundView = require '../views/pages/NotFoundView'
Application = require './Application'

routes = ->
	[
		Route
			path: Application.state.config.baseRoute
			handler: AppView
		,
			Route
				name: 'login',
				handler: LoginView
				key: 'LoginView'
			Route
				path: Application.state.config.baseRoute
				handler: AuthenticatedView
			,
				DefaultRoute
					name: 'home'
					handler: HomeView
					key: 'HomeView'
		Route
			path: Application.state.config.baseRoute
			handler: AppView
		,
			NotFoundRoute
				handler: NotFoundView
				key: 'NotFoundView'
	]

module.exports =
	initialize: ->
		Router.run routes(), Router.HashLocation, (Handler) ->
			React.render React.createElement(Handler), document.getElementById 'app-container'
