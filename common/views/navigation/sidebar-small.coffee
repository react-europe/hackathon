CloseBtn = React.createFactory require '../close-btn'
Velocity = require 'velocity-animate'
Style = require '../../styles/generated/props'
DomUtil = require '../../utils/dom'

{ section, div, span } = require 'elements'

module.exports = React.createClass

	displayName: 'SidebarSmall'

	getInitialState: -> open: false

	componentDidMount: ->
		document.addEventListener 'click', @onBodyClicked

	componentWillUnmount: ->
		document.removeEventListener 'click', @onBodyClicked

	onBodyClicked: (e) ->
		@closeMenu() unless DomUtil.isDescendant @getDOMNode(), e.target

	componentDidUpdate: (prevProps, prevState) ->
		if @state.open and not prevState.open
			Velocity @refs.menuWrapper.getDOMNode(),
				opacity: [1, 0]
				translateX: [0, -Style.baseSpacingUnit * 5]
			,
				duration: Style.transitionSpeed
				easing: Style.easing

	render: ->
		div {},
			CloseBtn
				open: @state.open
				className: 'sidebar__close-btn'
				closing: @state.closing or false
				onClick: @toggleMenu
			,
				span ''
			if @state.open
				section { ref: 'menuWrapper', className: 'sidebar sidebar--small', style: opacity: 0;},
					React.Children.map @props.children, (el) => React.addons.cloneWithProps el, onClick: @closeMenu

	toggleMenu: (e) ->
		if @state.open then @closeMenu(e) else @openMenu(e)

	openMenu: (e) ->
		e.stopPropagation()
		@setState
			open: true

	closeMenu: () ->
		@setState
			closing: true

		if not @refs.menuWrapper? #Not open, just make sure state is set correctly
			@setState
				open: false
				closing: false
		else
			Velocity @refs.menuWrapper.getDOMNode(),
				opacity: [0,1]
				translateX: [-Style.baseSpacingUnit * 5, 0]
			,
				duration: Style.transitionSpeed
				easing: Style.easing
				complete: =>
					if @isMounted()
						@setState
							open: false
							closing: false
