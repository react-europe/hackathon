{ PureRenderMixin } = require('react/addons').addons
classNames = require 'classnames'
VelocityTransitionGroup = React.createFactory require './transition/velocity-transition'

module.exports = React.createClass

	displayName: 'AnimatedFeedback'

	mixins: [PureRenderMixin]

	propTypes:
		showFeedback: React.PropTypes.bool.isRequired
		showArrow: React.PropTypes.bool
		feedbackMessage: React.PropTypes.string

	getDefaultProps: ->
		showArrow: true

	render: ->
		classes = classNames
			'feedback-tooltip': true
			'feedback-tooltip--arrow': @props.showArrow
			'feedback-tooltip--warning': @props.warning

		if @props.showFeedback and @props.feedbackMessage
			React.createElement 'div', {className: "#{classes} #{@props.className or ''}"}, @props.feedbackMessage
		else null
