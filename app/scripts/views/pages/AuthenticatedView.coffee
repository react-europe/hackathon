app = require '../../base/Application'
Authentication = require '../../base/Authentication'
Router = require 'react-router'
RouteHandler = React.createFactory Router.RouteHandler
LoginView = React.createFactory require './LoginView'
HeaderView = React.createFactory require '../common/HeaderView'

# FeatureToggler = require('qcommon/utils/feature-toggler')
# VelocityTransitionGroup = React.createFactory require '../viewcomponents/transition/velocity-transition'
# NotificationWrapperView = React.createFactory require '../viewcomponents/notifications/notification-wrapper--view'

module.exports = React.createClass

	displayName:  'AppView'

	mixins: [ Router.Navigation ]

	statics:
		willTransitionTo: (transition) -> return
			# if not app.functions.authentication.isLoggedIn()
			# 	LoginView.attemptedTransition = transition
			# 	transition.redirect 'login'

	componentWillUpdate: ->
		return
		# if not app.functions.authentication.isLoggedIn()

		# 	# Not sure why the setTimeout is needed. Can't be arsed to find out.
		# 	setTimeout (=> @transitionTo 'login'), 10

	render: ->
		React.createElement 'div', {},
			HeaderView @props
			RouteHandler _.assign {}, @props,
				params: @context.router.getCurrentParams()
