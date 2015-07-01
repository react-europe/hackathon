classNames = require 'classnames'
DomUtil = require '../utils/dom'
Style = require '../styles/generated/props'
Breakpoints = require '../mixins/breakpoints'
Velocity = require 'velocity-animate'
Button = React.createFactory require './btn'
Popup = React.createFactory require './popup'

boxClasses = ''

module.exports = React.createClass

	displayName: 'TooltipPopup'

	mixins: [Breakpoints]

	# React props
	propTypes:
		linkContent: React.PropTypes.oneOfType [
				React.PropTypes.string.isRequired
				React.PropTypes.element.isRequired
			]
		popupClass: React.PropTypes.string.isRequired
		popupContent: React.PropTypes.object.isRequired
		fetching: React.PropTypes.bool

	# React functions
	getInitialState: ->
		open: false
		closing: false

	getDefaultProps: ->
		sidebar: false
		left: false
		dynamicPosition: false

	componentDidMount: ->
		document.addEventListener 'click', @onBodyClicked
		document.addEventListener 'keydown', @globalKeyupHandler
		@getDOMNode().addEventListener 'click', @closeIfCloser

	closeIfCloser: (e) ->
		shouldClose = DomUtil.findParent e.target, e.currentTarget, (child) ->
			'js-close-popup' in child.classList
		@closePopup() if shouldClose

	componentWillUpdate: (nextProps, nextState) ->
		if nextState.open and not @state.open
			boxClasses = @getBoxClasses()

	globalKeyupHandler: (e) ->
		if e.keyCode is 27 or e.keyCode is 13
			@onCloseClicked()

	componentWillUnmount: ->
		document.removeEventListener 'click', @onBodyClicked
		document.removeEventListener 'keydown', @globalKeyupHandler
		@getDOMNode().removeEventListener 'click', @onCloseClicked

	componentDidUpdate: (prevProps, prevState) ->
		if @state.open and not prevState.open
			translateValues = [
				0
				Style.baseSpacingUnit
			]

			Velocity @refs.content.getDOMNode(),
				opacity: 1
				translateY: translateValues
			,
				duration: Style.transitionSpeed
				easing: Style.easing

	render: -> if @screenWidth 'xs', 's' then Popup @props else @_renderTooltipPopup()

	_renderTooltipPopup: ->
		React.createElement 'div', {className: @getWrapperClasses()},
			React.createElement 'span',
				'data-touch-feedback': true
				onClick: @onOpenClicked
				className: @getLinkClasses()
			,
				if typeof @props.linkContent is 'string'
					Button {modifiers: ['quiet'], className: 'tooltip-popup__link-text'}, @props.linkContent
				else
					React.createElement 'span', {className: 'tooltip-popup__link-content'}, @props.linkContent
			if @state.open
				React.createElement 'div', {className: boxClasses, ref: 'content', style: @getContentStyles()},
					React.createElement 'div', {className: 'tooltip-popup__box-content'},
						@props.popupContent

	# Event handlers
	onBodyClicked: (e) ->
		@closePopup(e) if @isMounted() and @state.open and not DomUtil.isDescendant @getDOMNode(), e.target

	onOpenClicked: (e) ->
		if @state.open then @closePopup(e) else @openPopup e

	onCloseClicked: (e) ->
		if @state.open then @closePopup e

	openPopup: (e) ->
		e.stopPropagation()
		@setState
			open: true

	getContentStyles: ->
		contentStyles =
			opacity: 0
			transform: "translateY(#{Style.baseSpacingUnit})"

	getWrapperClasses: ->
		classes =
			'tooltip-popup': true
			'fetch': @props.fetching?
			'open': @state.open
			'closing': @state.closing
			'fetch--fetching': @props.fetching

		classes[@props.popupClass] = true
		classNames classes

	getBoxClasses: ->
		isOnLeftHalf = @isMounted() and DomUtil.isOnLeftHalf @getDOMNode()
		isOnTopHalf = @isMounted() and DomUtil.isOnTopHalf @getDOMNode()
		modifierClass = 'tooltip-popup__box--'
		modifierClass += if isOnTopHalf then 'bottom-' else 'top-'
		modifierClass += if isOnLeftHalf then 'left' else 'right'

		"tooltip-popup__box #{modifierClass}"

	getLinkClasses: ->
		'tooltip-popup__link'

	closePopup: ->
		translateValues = [
			Style.baseSpacingUnit
			0
		]
		content = @refs.content.getDOMNode()

		# defer the animation call to make sure it's async since React seems to have an issue with a click handler not being executed while the component is being re-rendered
		_.defer =>
			if @isMounted()
				@setState {closing: true}

			Velocity content,
				opacity: 0
				translateY: translateValues
			,
				duration: Style.transitionSpeed
				easing: Style.easing
				complete: =>
					if @isMounted()
						@setState
							open: false
							closing: false
