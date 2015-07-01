{ PureRenderMixin } = require('react/addons').addons
classNames = require 'classnames'

module.exports = React.createClass

	mixins: [PureRenderMixin]

	displayName: 'InputElement'

	propTypes:
		className: React.PropTypes.string
		id: React.PropTypes.string.isRequired
		type: React.PropTypes.string
		name: React.PropTypes.string
		required: React.PropTypes.bool
		value: React.PropTypes.string
		onValueChanged: React.PropTypes.func
		onBlur: React.PropTypes.func
		focus: React.PropTypes.bool

	componentDidMount: ->
		if @props.focus
			_.delay => @refs.inputEl.getDOMNode().focus()

		# Hack to handle autofill in Webkit
		inputDOMNode = @getDOMNode()
		inputDOMNode.addEventListener 'change', autofillHandler = (e) =>
			if @isMounted()
				@onChange
					target:
						value: e.target.value
			inputDOMNode.removeEventListener 'change', autofillHandler

	getInitialState: ->
		value: @props.value

	componentWillReceiveProps: (props) ->
		@setState
			value: props.value

	render: ->
		domElement = if @props.type is 'textarea' then 'textarea' else 'input'
		inputFieldClasses =
			'input': true
			'input--empty': @isEmpty()
		inputFieldClasses["input--#{@props.type}"] = true if @props.type
		inputFieldClasses[@props.className] = true

		React.createElement domElement,
			id: @props.id
			type: @props.type
			required: @props.required
			value: @state.value
			className: classNames inputFieldClasses
			placeholder: @props.placeholder
			name: @props.name or @props.id
			onChange: @onChange
			onBlur: @props.onBlur
			ref: 'inputEl'
			size: Math.floor @props.value?.length * 1.25 # For some reason this is needed...

	isEmpty: ->
		!(@state.value?.length > 0 and @state.value isnt '')

	onChange: (e) ->
		#Why do a setState? Otherwise the input cursor will jump to the end...
		@setState
			value: e.target.value
		@props.onValueChanged? e

	getCursorPosition: ->
		@refs.inputEl.getDOMNode().selectionStart
