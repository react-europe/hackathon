DomUtil = require '../../utils/dom'
Icon = React.createFactory require '../icon'

{ div } = require 'elements'

stopPropagation = (event) ->
	event.stopPropagation()

module.exports = React.createClass

	displayName: 'ModalContent'

	propTypes:
		modalWrapperClass: React.PropTypes.string
		modalClass: React.PropTypes.string
		content: React.PropTypes.object
		onClose: React.PropTypes.func
		closeOnBodyClicked: React.PropTypes.bool

	getDefaultProps: ->
		closeOnBodyClicked: true
		bigCloseButton: false

	getInitialState: ->
		afterOpen: false
		beforeClose: false

	componentDidMount: ->
		# Focus needs to be set when mounting and already open
		if @props.isOpen
			@setFocusAfterRender true
			@open()
		@setHtmlClass true
		document.addEventListener 'keyup', @globalKeyupHandler

	componentWillReceiveProps: (newProps) ->
		# Focus only needs to be set once when the modal is being opened
		if !@props.isOpen and newProps.isOpen
			@setFocusAfterRender true
		if newProps.isOpen
			@open()
		else if newProps.isOpen
			@close()

	componentDidUpdate: ->
		if @focusAfterRender
			@focusContent()
			@setFocusAfterRender false

	componentWillUnmount: ->
		@setHtmlClass false
		document.removeEventListener 'keyup', @globalKeyupHandler

	onBodyClicked: (e) ->
		return unless @props.closeOnBodyClicked
		if @isMounted() and not DomUtil.isDescendant @refs.modal.getDOMNode(), e.target
			@requestClose(e)

	setHtmlClass: (shouldAdd) ->
		htmlClasses = document.querySelector('html').classList
		if shouldAdd
			htmlClasses.add 'modal-open'
		else
			htmlClasses.remove 'modal-open'

	globalKeyupHandler: (e) ->
		# ESC key
		if e.keyCode is 27 then @close()

	open: ->
		# focusManager.setupScopedFocus @getDOMNode()
		# focusManager.markForFocusLater()
		@setState { isOpen: true }, (->
			@setState afterOpen: true
		).bind(this)

	close: ->
		if !@ownerHandlesClose?()
			@afterClose()
			return
		@closeWithoutTimeout()

	setFocusAfterRender: (focus) ->
		@focusAfterRender = focus

	focusContent: ->
		@refs.content.getDOMNode().focus()

	closeWithoutTimeout: ->
		@setState {
			afterOpen: false
			beforeClose: false
		}, @afterClose

	afterClose: ->
		@setHtmlClass false
		@props.onClose?()

		# focusManager.returnFocus()
		# focusManager.teardownScopedFocus()

	handleKeyDown: (event) ->
		if event.keyCode == 27
			@requestClose()

	handleOverlayClick: ->
		if @props.closeOnBodyClicked()
			@close()
		else
			@focusContent()

	requestClose: ->
		@props.onClose?()

	shouldBeClosed: ->
		!@props.isOpen and !@state.beforeClose

	render: ->
		if @shouldBeClosed()
			return null
		else
			div {className: "modal-wrapper #{@props.modalWrapperClass}", onClick: @onBodyClicked, ref: 'overlay'},
				div {className: "modal modal-open #{@props.modalClass}", ref: 'modal', tabIndex: '-1', onClick: stopPropagation},
					div {className: 'modal__close-btn', ref: 'content', onClick: @requestClose}, Icon name: 'x-s', className: 'icon--s'

					div {className: 'modal__content', ref: 'content'}, @props.children
