classNames = require 'classnames'
InternalLink = React.createFactory require './internal-link'

module.exports = React.createClass
	displayName: 'LinkButton'

	getDefaultProps: ->
		className: ''

	render: ->
		btnProps = _.assign {}, @props,
			className: @getClasses()
			disabled: @props.loading or @props.disabled
			'data-touch-feedback': if (@props.loading or @props.disabled) then undefined else true
		InternalLink btnProps,
			@props.children

	getClasses: ->
		classes =
			'btn': true
			'btn--with-spinner': @props.hasSpinner
			'btn--loading': @props.loading
			'btn--selected': @props.selected
			'btn--disabled': @props.disabled
		for modifier in @props.modifiers
			classes["btn--#{modifier}"] = true
		classes[@props.className] = @props.className?
		classNames classes
