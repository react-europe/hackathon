{ PureRenderMixin } = require('react/addons').addons
classNames = require 'classnames'
DomUtil = require '../utils/dom'
Feedback = React.createFactory require './feedback'
Label = React.createFactory require './text-input/label'
InputElement = React.createFactory require './text-input/input'

module.exports = React.createClass

	displayName: 'TextInput'

	mixins: [PureRenderMixin]

	propTypes:
		label: React.PropTypes.string
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
		feedbackMessage: React.PropTypes.string

	getDefaultProps: ->
		id: DomUtil.randomString()
		type: 'text'

	render: ->
		id = @props.id or DomUtil.randomString()
		showFeedback = @showFeedback()
		wrapperClasses = classNames
			'input-wrapper': true
			'bottom-margin': true
			'input--feedback': showFeedback
			'fetch': @props.fetching?
			'fetch--fetching': @props.fetching

		React.createElement 'div',
			className: "#{wrapperClasses} #{@props.wrapperClassName or ''}"
		,
			InputElement
				className: "input--text #{@props.className}"
				id: id
				type: @props.type
				name: @props.name
				required: @props.required
				value: @props.value
				focus: @props.focus
				placeholder: @props.placeholder
				onValueChanged: @props.onValueChanged
			if @props.label
				Label
					htmlFor: id
					label: @props.label
			Feedback
				feedbackMessage: @props.feedbackMessage
				showFeedback: showFeedback

	showFeedback: ->
		not (@props.feedbackMessage is '' or @props.feedbackMessage is undefined)

	focus: ->
		null
		# @refs.textinput.getDOMNode().focus()
