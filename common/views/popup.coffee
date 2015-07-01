classNames = require 'classnames'
DomUtil = require '../utils/dom'
Style = require '../styles/generated/props'
Breakpoints = require '../mixins/breakpoints'
Velocity = require 'velocity-animate'
Button = React.createFactory require './btn'
CloseButton = React.createFactory require './close-btn'

module.exports = React.createClass

	displayName: 'Popup'

	mixins: [Breakpoints]

	propTypes:
		linkContent: React.PropTypes.oneOfType [
			React.PropTypes.string.isRequired
			React.PropTypes.element.isRequired
		]
		popupClass: React.PropTypes.string
		popupContent: React.PropTypes.oneOfType [
			React.PropTypes.array.isRequired
			React.PropTypes.element.isRequired
		]
		fetching: React.PropTypes.bool
		closeOnBackdropClick: React.PropTypes.bool
		edge: React.PropTypes.string

	getDefaultProps: ->
		edge: 'right'
		closeOnBackdropClick: true
		popupClass: ''

	getInitialState: ->
		open: false
		closing: false

	componentDidMount: ->
		document.addEventListener 'keydown', @globalKeyupHandler
		@getDOMNode().addEventListener 'click', @closeIfCloser

	closeIfCloser: (e) ->
		shouldClose = DomUtil.findParent e.target, e.currentTarget, (child) ->
			'js-close-popup' in child.classList
		@closePopup() if shouldClose

	globalKeyupHandler: (e) ->
		if e.keyCode is 27 or e.keyCode is 13
			@onCloseClicked()

	componentWillUnmount: ->
		document.removeEventListener 'keydown', @globalKeyupHandler
		@getDOMNode().removeEventListener 'click', @closeIfCloser
		if @state.open
			DomUtil.removeBodyClass('popup-is-open')
			DomUtil.removeBodyClass('no-scroll')

	componentDidUpdate: (prevProps, prevState) ->
		if @state.open and not prevState.open
			translateValues = [
				0
				(if @props.edge is 'left' then -Style.baseSpacingUnit else Style.baseSpacingUnit)
			]

			Velocity @refs.content.getDOMNode(),
				opacity: 1
				translateX: if @fullscreenPopup() then 0 else translateValues
			,
				duration: Style.transitionSpeed
				easing: Style.easing

			if @refs.close?
				Velocity @refs.close.getDOMNode(),
					opacity: [1, 0]
				,
					duration: Style.transitionSpeed
					easing: Style.easing

	render: ->
		React.createElement 'div', {className: @getWrapperClasses()},
			if typeof @props.linkContent is 'string'
				Button
					modifiers: ['quiet']
					className: 'popup__link-text'
					onClick: @onOpenClicked
				, @props.linkContent
			else
				React.createElement 'span',
					className: 'popup__link'
					onClick: @onOpenClicked
				,
					React.createElement 'span',
						className: 'popup__link-content'
					, @props.linkContent
			if @state.open
				React.createElement 'div', {className: @getBoxClasses(), ref: 'content', style: @getContentStyles()},
					React.createElement 'div', {className: 'popup__box-content'},
						@props.popupContent
			if @state.open and not @fullscreenPopup()
				React.createElement 'div', {className: 'popup__backdrop', onClick: @onBackdropClicked }
			if @state.open and @fullscreenPopup()
				CloseButton
					className: ' js-close-popup close-btn--popup'
					ref: 'close'
					open: true
					closing: false
					onClick: @onCloseClicked

	# Event handlers
	onOpenClicked: (e) ->
		if @state.open then @closePopup(e) else @openPopup e

	onBackdropClicked: (e) ->
		if @state.open and @props.closeOnBackdropClick then @closePopup e

	onCloseClicked: (e) ->
		if @state.open then @closePopup e

	openPopup: (e) ->
		_.defer ->
			DomUtil.addBodyClass 'no-scroll'
			DomUtil.addBodyClass 'popup-is-open'
		e.stopPropagation()
		@setState
			open: true

	getContentStyles: ->
		contentStyles =
			opacity: 0
			transform: "translateY(#{-Style.baseSpacingUnit})"

	getWrapperClasses: ->
		classes =
			'popup': true
			'fetch': @props.fetching?
			'open': @state.open
			'closing': @state.closing
			'fetch--fetching': @props.fetching

		classes[@props.popupClass] = true
		classNames classes

	getBoxClasses: ->
		'popup__box'

	fullscreenPopup: ->
		@screenWidth 'xs', 's'

	closePopup: ->
		if @state.open
			DomUtil.removeBodyClass('popup-is-open')
			DomUtil.removeBodyClass('no-scroll')
		translateValues = [
			(if @props.edge is 'left' then -Style.baseSpacingUnit else Style.baseSpacingUnit)
			0
		]
		content = @refs.content.getDOMNode()

		# defer the animation call to make sure it's async since React seems to have an issue with a click handler not being executed while the component is being re-rendered
		_.defer =>
			if @isMounted()
				@setState {closing: true}

			Velocity content,
				opacity: 0
				translateX: if @fullscreenPopup() then 0 else translateValues
			,
				duration: Style.transitionSpeed
				easing: Style.easing
				complete: =>
					if @isMounted()
						@setState
							open: false
							closing: false
