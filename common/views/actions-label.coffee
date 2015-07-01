
AnimateContent = require '../mixins/animate-content'

Button = React.createFactory require './btn'
Icon = React.createFactory require './icon'

{ div, span } = require 'elements'

module.exports = React.createClass

	displayName: 'ActionsLabel'

	mixins: [ AnimateContent ]

	propTypes:
		className: React.PropTypes.string
		label: React.PropTypes.string
		actions: React.PropTypes.array

	render: ->
		div
			className: "#{@props.className} actions-label actions-label--open"
			ref: 'animate'
			'data-animate-show-content': true
		,
			span
				className: 'actions-label__label'
			, @props.label
			div
				className: 'actions-label__content'
			,
				@props.actions
