classNames = require 'classnames'
Interactable = require '../mixins/interactable'
TagInitializer = require '../mixins/tag-initializer'

module.exports = React.createClass

	displayName: 'Resizable'

	mixins: [Interactable, TagInitializer]

	getDefaultProps: ->
		axis: 'xy'

	getInitialState: ->
		active: []
		style: {}

	componentDidMount: ->
		@setState
			style:
				width: @getDOMNode().offsetWidth
				height: @getDOMNode().offsetHeight
		@interactable.resizable
			axis: @props.axis
			allowFrom: '.resizable__handle'
			onstart: (event) =>
				@setState
					active: true
			onmove: (event) =>
				newWidth  = parseFloat(event.target.style.width) + event.dx
				newHeight = parseFloat(event.target.style.height) + event.dy
				@setState
					style:
						width: newWidth
						height: newHeight
			onend: (event) =>
				@setState
					active: false

	render: ->
		handleClass = "resizable__handle--#{@props.axis}"
		classes = classNames
			'resizable': true
			'resizable--active': @state.active
		@div {className: classes, style: @state.style},
			@div {className: 'resizable__handle ' + handleClass}
			@props.children
