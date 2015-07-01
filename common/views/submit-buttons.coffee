Button = React.createFactory require './btn'
SubmitButton = React.createFactory require './submit-button'
DeleteButton = React.createFactory require './delete-button'
translate = require '../utils/translate'

{ div } = require 'elements'

module.exports = SubmitButtons = React.createClass

	displayName: 'SubmitButtons'

	propTypes:
		okBtn: React.PropTypes.object
		okOnEnter: React.PropTypes.bool
		cancelBtn: React.PropTypes.object
		deleteBtn: React.PropTypes.object

	getDefaultProps:->
		okBtn:
			loading: false
			className: 'js-save-btn'
			callback: -> return
		cancelBtn: {}
		deleteBtn: undefined

	statics:
		eventhandlers: []

	# Save the current event listener and put it back when we unmount.

	componentWillMount: ->
		@registerKeyDownHandler()

	componentWillUnmount: ->
		@unregisterKeyDownHandler()

	render: ->
		props = @props
		div {className: "submit-buttons #{props.className}"},
			div {className: 'submit-buttons__right'},
				if props.okBtn and props.okBtn.display isnt false
					SubmitButton
						modifiers: ['primary', 'l', 'submit']
						className: props.okBtn.className or 'js-save-btn'
						loading: props.okBtn.loading
						onClick: props.okBtn.callback
						onKeyDown: @onKeyDown
					, props.okBtn.label or translate 'OK'

				if props.cancelBtn and props.cancelBtn.display isnt false
					Button
						modifiers: ['quiet-warning']
						className: "submit-buttons__cancel #{props.cancelBtn.className or 'js-cancel-btn'}"
						onClick: props.cancelBtn.callback
					, props.cancelBtn.label or translate 'Cancel'

			if props.deleteBtn and props.deleteBtn.display isnt false

				DeleteButton
					className: "submit-button__left #{props.deleteBtn.className or 'js-delete-btn'}"
					confirmLabel: translate props.deleteBtn.confirmLabel
					confirmText: translate 'Are you sure?' unless translate props.deleteBtn.confirmText
					onClick: props.deleteBtn.callback
				, props.deleteBtn.label or translate 'Delete'

	registerKeyDownHandler: ->
		# To make sure only the correct event handler is fired, we identify them with a number.

		handlersArr = SubmitButtons.eventhandlers
		max = if handlersArr.length is 0 then 0 else _.max(handlersArr)

		# Add a new handler id to the static array
		handlersArr.push max + 1

		# And save the same id on the state
		@setState
			handlerId: max + 1

		# Add the handler
		$('body').on 'keydown', @onKeyDown

	unregisterKeyDownHandler: ->
		# Remove the handler id from the static array
		handlersArr = SubmitButtons.eventhandlers
		index = handlersArr.indexOf @state.handlerId
		unless index is -1
			handlersArr.splice index, 1

		# Remove the handler
		$('body').off 'keydown', @onKeyDown

	onKeyDown: (e) ->
		# If we are not the handler with the highest id, i.e. the handler that was added last, we return.
		if _.max(SubmitButtons.eventhandlers) is @state.handlerId

			if e.keyCode is 13 and (@props.okOnEnter or (e.ctrlKey or e.metaKey))
				@props.okBtn.callback?()

			else if e.keyCode is 27 and (e.ctrlKey or e.metaKey)
				@props.cancelBtn.callback?()
