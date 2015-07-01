classNames = require 'classnames'
DomUtil = require '../../utils/dom'
Style = require '../../styles/generated/props'
Breakpoints = require '../../mixins/breakpoints'
Velocity = require 'velocity-animate'
Button = React.createFactory require '../btn'
Icon = React.createFactory require '../icon'

{ div, span, h4 } = require 'elements'

module.exports = React.createClass

	displayName: 'Submenu'

	mixins: [Breakpoints]

	propTypes:
		linkContent: React.PropTypes.oneOfType [
			React.PropTypes.string.isRequired
			React.PropTypes.element.isRequired
		]
		submenuClass: React.PropTypes.string.isRequired

	componentDidMount: ->
		document.addEventListener 'click', @onBodyClicked

	componentWillUnmount: ->
		document.removeEventListener 'click', @onBodyClicked

	getInitialState: ->
		open: false
		closing: false

	componentDidUpdate: (prevProps, prevState) ->
		if @state.open and not prevState.open
			translateValues = [
				0
				-Style.baseSpacingUnit
			]

			Velocity @refs.content.getDOMNode(),
				opacity: 1
				translateX: translateValues
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
		div {className: @getWrapperClasses()},
			span
				# className: 'menu__link'
				onClick: @onOpenClicked
				'data-touch-feedback': true
			,
				span
					className: 'menu__link-content'
				, @props.linkContent
				# Icon {name: 'arrow-right-s', className: 'icon--s icon--inverted icon--no-right-padding menu__link-arrow'}
			if @state.open
				[
					Icon name: 'arrow-left-s', className: 'submenu__back icon--s', key: 'arrow-left', onClick: @onCloseClicked
					div {className: 'submenu__content', ref: 'content', style: @getContentStyles(), key: 'content'},
						h4 className: 'center', @props.title
						@props.children
				]

	# Event handlers

	onBodyClicked: (e) ->
		@closeSubmenu(e) if @isMounted() and @state.open and not @state.closing and not DomUtil.isDescendant @getDOMNode(), e.target

	onOpenClicked: (e) ->
		if @state.open then @closeSubmenu(e) else @openSubmenu e

	onCloseClicked: (e) ->
		if @state.open then @closeSubmenu e

	openSubmenu: (e) ->
		# e.stopPropagation()
		@setState
			open: true

	getContentStyles: ->
		contentStyles =
			opacity: 0
			transform: "translateY(#{-Style.baseSpacingUnit})"

	getWrapperClasses: ->
		classes =
			'submenu': true
			'open': @state.open
			'closing': @state.closing

		classes[@props.submenuClass] = true
		classNames classes

	closeSubmenu: ->
		translateValues = [
			-Style.baseSpacingUnit
			0
		]
		content = @refs.content.getDOMNode()

		# defer the animation call to make sure it's async since React seems to have an issue with a click handler not being executed while the component is being re-rendered
		_.defer =>
			if @isMounted()
				@setState {closing: true}

			Velocity content,
				opacity: 0
				translateX: translateValues
			,
				duration: Style.transitionSpeed
				easing: Style.easing
				complete: =>
					if @isMounted()
						@setState
							open: false
							closing: false
