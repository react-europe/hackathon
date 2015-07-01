app = require '../../base/Application'
Authentication = require '../../base/Authentication'
Router = require 'react-router'
RouteHandler = React.createFactory Router.RouteHandler
HeaderView = React.createFactory require '../common/HeaderView'

# FeatureToggler = require('qcommon/utils/feature-toggler')
# VelocityTransitionGroup = React.createFactory require '../viewcomponents/transition/velocity-transition'
# NotificationWrapperView = React.createFactory require '../viewcomponents/notifications/notification-wrapper--view'

module.exports = React.createClass

	displayName:  'AppView'

	mixins: [ Router.Navigation ]

	render: ->
		React.createElement 'div', {},
			HeaderView @props
			RouteHandler _.assign {}, @props,
				params: @context.router.getCurrentParams()
