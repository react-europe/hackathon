
Router = require 'react-router'

Route = React.createFactory Router.Route
DefaultRoute = React.createFactory Router.DefaultRoute

AppView = require './AppView'
AuthenticatedView = require '../views/pages/AuthenticatedView'
HomeView = require '../views/pages/HomeView'
Application = require './Application'

routes = ->
	[
		Route
			path: Application.state.config.baseRoute
			handler: AppView
		,
			Route
				path: Application.state.config.baseRoute
				handler: AuthenticatedView
			,
				DefaultRoute
					name: 'home'
					handler: HomeView
					key: 'HomeView'
	]

module.exports =
	initialize: ->
		Router.run routes(), Router.HashLocation, (Handler) ->
			React.render React.createElement(Handler), document.getElementById 'app-container'
