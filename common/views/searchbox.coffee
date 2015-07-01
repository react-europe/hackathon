{ PureRenderMixin } = require('react/addons').addons
classnames = require 'classnames'
Spinner = React.createFactory require './spinner'
Icon = React.createFactory require './icon'

Modernizr = require 'browsernizr'

module.exports = React.createClass

	displayName: 'Searchbox'

	mixins: [PureRenderMixin]

	propTypes:
		className: React.PropTypes.string
		disabled: React.PropTypes.bool
		modifiers: React.PropTypes.array
		placeholder: React.PropTypes.string
		value: React.PropTypes.string
		onClear: React.PropTypes.func.isRequired
		onChange: React.PropTypes.func.isRequired
		spinner: React.PropTypes.bool

	getDefaultProps: ->
		modifiers: []

	componentDidMount: ->
		@getDOMNode().addEventListener 'keydown', @globalKeyupHandler

	globalKeyupHandler: (e) ->
		if e.keyCode is 27
			if @haveSearch then e.stopPropagation()

	componentWillUnmount: ->
		@getDOMNode().removeEventListener 'keydown', @globalKeyupHandler

	render: ->
		React.createElement 'div', {className: @getClasses()},
			React.createElement 'input',
				type: 'search'
				className: 'input searchbox__input'
				placeholder: @props.placeholder
				onChange: @_onChange
				value: @props.value or ''
				ref: 'searchInput'
				autoFocus: @props.autoFocus or Modernizr.touch
				size: Math.floor @props.value?.length * 1.25 # For some reason this is needed...
			unless @props.value
				Icon
					name: 'search-s'
					className: 'searchbox__search-icon icon--s icon--quiet-action'
					onClick: @_onClear
			if @props.spinner
				Spinner
					className: 'searchbox__spinner'
					display: true
					onClick: @_onClear
			else
				Icon
					name: 'x-s'
					className: 'searchbox__clear icon--s icon--quiet-action'
					onClick: @_onClear

	getClasses: ->
		classes =
			'searchbox': true
		for modifier in @props.modifiers
			classes["searchbox--#{modifier}"] = true
		classes[@props.className] = @props.className?
		classnames classes

	_onChange: (e) ->
		e.stopPropagation()
		@haveSearch = e.target.value.length
		@props.onChange?(e, e.target.value)

	_onClear: ->
		@refs.searchInput.getDOMNode().focus()
		@props.onClear()
