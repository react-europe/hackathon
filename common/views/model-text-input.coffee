TextInput = React.createFactory require './text-input'
translate = require '../utils/translate'

module.exports = React.createClass

	displayName: 'ModelTextInput'

	propTypes:
		formName: React.PropTypes.string.isRequired
		modelValue: React.PropTypes.string.isRequired
		model: React.PropTypes.object
		onValueChange: React.PropTypes.func
		validate: React.PropTypes.bool
		type: React.PropTypes.string

	getDefaultProps: ->
		type: 'text'

	render: ->
		modelValue = @props.modelValue
		idAndClassName = [@props.formName, modelValue].join('__')

		TextInput _.assign {}, @props,
			className: idAndClassName
			feedbackMessage: @feedback()
			fetching: !@props.model?
			id: idAndClassName
			onValueChanged: @onValueChanged
			ref: 'textInput'
			validate: true
			key: @props.modelValue
			autoFocus: @props.autoFocus
			value: @props.model?.get modelValue

	onValueChanged: (e) ->
		@props.model?.set @props.modelValue, e.target.value
		@props.onValueChange?(e)

	focus: ->
		@refs.textInput.focus()

	feedback: ->
		if @props.validate
			translate @props.model?.validate()?[@props.modelValue]
		else
			undefined
