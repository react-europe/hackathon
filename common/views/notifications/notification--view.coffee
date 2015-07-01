VelocityTransitionGroup = React.createFactory require '../transition/velocity-transition'

MessageView = React.createFactory require './notification-message--view'

{ div, ul } = require 'elements'

module.exports = React.createClass

	displayName: 'NotificationView'

	propTypes:
		notifications: React.PropTypes.array.isRequired
		onRead: React.PropTypes.func.isRequired

	render: ->
		div {className: 'notifications'},
			ul {className: 'notifications__list'},
				VelocityTransitionGroup {transition: 'fadeUpSmall'},
					@props.notifications.map (item) =>
						MessageView
							message: item.message
							type: item.type
							key: "message-#{item.id}"
							onRead: => @props.onRead item
							autoFade: @shouldAutoFade item.type

	shouldAutoFade: (type) ->
		return true
		# shouldFade = [
		# 	'success'
		# 	'info'
		# ]
		# shouldFade.indexOf(type) > -1

