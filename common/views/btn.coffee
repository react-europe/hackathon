
# require '../styles/components/_btn.scss'

classNames = require 'classnames'

module.exports = React.createClass

	displayName: 'Button'

	propTypes:
		className: React.PropTypes.string
		selected: React.PropTypes.bool
		disabled: React.PropTypes.bool
		modifiers: React.PropTypes.array
		dataset: React.PropTypes.object
		element: React.PropTypes.string

	getDefaultProps: ->
		modifiers: ['normal']
		element: 'button'

	render: ->
		btnProps = _.extend @getDatasetProps(),
			className: @getClasses()
			type: 'button'
			disabled: @props.loading or @props.disabled
			onClick: unless @props.responsiveTouch then @onClick else undefined
			onTouchStart: if @props.responsiveTouch then @onClick else undefined
			onMouseDown: if @props.responsiveTouch then @onClick else undefined
			style: @props.style
			'data-touch-feedback': if (@props.loading or @props.disabled) then undefined else true
		React.createElement @props.element, btnProps,
			@props.children


	getDatasetProps: ->
		obj = {}
		_.map @props.dataset, (value, key) ->
			obj["data-#{key}"] = value
		obj

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

	onClick: (e) ->
		if not (@props.loading or @props.disabled)
			@props.onClick?(e)
			e.preventDefault()
