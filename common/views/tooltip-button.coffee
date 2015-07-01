{ PureRenderMixin } = require('react/addons').addons

module.exports = React.createClass

	displayName: 'TooltipButton'

	mixins: [PureRenderMixin]

	# React props
	propTypes:
		linkContent: React.PropTypes.oneOfType [
				React.PropTypes.string.isRequired
				React.PropTypes.element.isRequired
			]
		tooltip: React.PropTypes.string.isRequired

	render: ->
		React.createElement 'div',
			'data-touch-feedback': true
			'data-tooltip': @props.tooltip
			className: @props.className
			onClick: @onClick
		,
			@props.linkContent

	onClick: (e) ->
		@props.onClick?(e)
