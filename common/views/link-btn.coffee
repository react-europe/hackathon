classNames = require 'classnames'
Link = React.createFactory require('react-router').Link

module.exports = React.createClass

	displayName: 'LinkButton'

	getDefaultProps: ->
		className: ''
		modifiers: []

	render: ->
		btnProps = _.assign {}, @props,
			className: @getClasses()
			disabled: @props.loading or @props.disabled
			'data-touch-feedback': if (@props.loading or @props.disabled) then undefined else true
		Link btnProps,
			@props.children

	getClasses: ->
		classes =
			'btn': true
			'btn--selected': @props.selected
			'btn--disabled': @props.disabled
		for modifier in @props.modifiers
			classes["btn--#{modifier}"] = true
		classes[@props.className] = @props.className?
		classNames classes
