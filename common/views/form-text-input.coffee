{ PureRenderMixin } = require('react/addons').addons
classNames = require 'classnames'
DomUtil = require '../utils/dom'
Feedback = React.createFactory require './feedback'
Label = React.createFactory require './text-input/label'
InputElement = React.createFactory require './text-input/input'

module.exports = React.createClass

	displayName: 'FormTextInput'

	mixins: [PureRenderMixin]

	propTypes:
		fetching: React.PropTypes.bool
		className: React.PropTypes.string
		wrapperClassName: React.PropTypes.string
		id: React.PropTypes.string
		type: React.PropTypes.string
		name: React.PropTypes.string
		required: React.PropTypes.bool
		focus: React.PropTypes.bool
		placeholder: React.PropTypes.string
		value: React.PropTypes.string
		onValueChanged: React.PropTypes.func
		onBlur: React.PropTypes.func
		feedbackMessage: React.PropTypes.string

	getDefaultProps: ->
		id: DomUtil.randomString()
		type: 'text'

	componentDidMount: ->
		if @props.autoFocus and @props.type is 'text'
			null

	render: ->
		id = @props.id or DomUtil.randomString()
		showFeedback = @showFeedback()
		wrapperClasses = classNames
			'input-wrapper': true
			'input-wrapper--form': true
			'input--feedback': showFeedback
			'fetch': @props.fetching?
			'fetch--fetching': @props.fetching

		React.createElement 'div',
			className: "#{wrapperClasses} #{@props.wrapperClassName or ''}"
		,
			InputElement
				className: "input--form input--text #{@props.className}"
				id: id
				type: @props.type
				name: @props.name
				required: @props.required
				value: @props.value
				focus: @props.focus
				ref: 'input'
				placeholder: @props.placeholder
				onValueChanged: @props.onValueChanged
				onBlur: @props.onBlur
			Feedback
				feedbackMessage: @props.feedbackMessage
				showFeedback: showFeedback

	getCursorPosition: ->
		@refs.input?.getCursorPosition()

	showFeedback: ->
		not (@props.feedbackMessage is '' or @props.feedbackMessage is undefined)

	focus: ->
		null
