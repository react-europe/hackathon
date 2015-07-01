ReactWithAddons = require 'react/addons'
Style = require '../../styles/generated/props'
Velocity = require 'velocity-animate'


ReactTransitionGroup = React.createFactory ReactWithAddons.addons.TransitionGroup

VelocityTransitionGroupChild = React.createClass

	displayName: 'VelocityTransitionGroupChild'

	getTransitionProperties: (transition, type) ->
		@transitions()[transition][type]

	getDelay: (transition, type) ->
		@transitions()[transition]?.delay?[type] or 0

	getEasing: (transition, type) ->
		@transitions()[transition]?.easing?[type] or Style.easing

	transitions: ->
		screenHeight = @_screenHeight()
		nodeHeight = @_nodeHeight()
		nodeWidth = @_nodeWidth()

		slideLeft:
			enter:
				opacity: [1, 0]
				translateX: [0, '100%']
				height: [0, 0]
			leave:
				opacity: [0, 1]
				translateX: ['-100%', 0]
				height: [0, 0]

		slideRight:
			enter:
				opacity: [1, 0]
				translateX: [0, '-100%']
			leave:
				opacity: [0, 1]
				translateX: ['100%', 0]

		slideUp:
			enter:
				opacity: [1, 0]
				translateY: [0, screenHeight]
			leave:
				opacity: [0, 1]
				translateY: ["-#{screenHeight}", 0]

		flipY:
			enter:
				opacity: [1, 0.1]
				rotateY: [0, 90]
				height: [0, 0]
			leave:
				opacity: [0.1, 1]
				rotateY: [-90, 0]
				height: [0, 0]
			delay:
				enter: @props.duration
			easing:
				enter: 'easeInCubic'
				leave: 'easeOutCubic'

		batman:
			enter:
				opacity: [1, 0]
				rotateZ: [0, 720]
				scale: [1, 0]
				# height: [screenHeight, screenHeight]
			leave:
				opacity: [0, 1]
				rotateZ: [-720, 0]
				scale: [0, 1]
				# height: [screenHeight, screenHeight]
			delay:
				enter: @props.duration
			easing:
				enter: 'easeInCubic'
				leave: 'easeOutCubic'

		slideDown:
			enter:
				opacity: [1, 0]
				translateY: [0, "-#{screenHeight}"]
				height: [0, 0]
			leave:
				opacity: [0, 1]
				translateY: [screenHeight, 0]
				height: [0, 0]

		fadeOutSlideUp:
			enter:
				opacity: [1, 0]
				translateY: [0, '100%']
			leave:
				opacity: [0, 1]
				scale: [0, 1]
			delay:
				enter: @props.duration / 2

		fadeOut:
			enter:
				opacity: [1, 0]
				scale: [1, 2]
				translateZ: [0, 0]
				height: [screenHeight, screenHeight]
			leave:
				opacity: [0, 1]
				scale: [0, 1]
				translateZ: [0, 0]
				height: [screenHeight, screenHeight]
			delay:
				enter: @props.duration / 2
			easing:
				enter: Style.easing
				leave: Style.easing

		fadeIn:
			enter:
				opacity: [1, 0]
			leave:
				opacity: [0, 1]
				scale: [1.3, 1]
				translateZ: [0, 0]
				height: [screenHeight, screenHeight]
			delay:
				enter: @props.duration

		fadeDownSmall:
			enter:
				opacity: [1, 0]
				translateY: [0, (-Style.baseSpacingUnit / 2)]
				translateZ: [0, 0]
				height: [nodeHeight, 0]
			leave:
				opacity: [0, 1]
				translateY: [(-Style.baseSpacingUnit / 2), 0]
				translateZ: [0, 0]
				height: [0, nodeHeight]


		fadeUpSmall:
			enter:
				opacity: [1, 0]
				translateY: [0, Style.baseSpacingUnit / 2]
				translateZ: [0, 0]
				height: [nodeHeight, 0]
			leave:
				opacity: [0, 1]
				translateY: [Style.baseSpacingUnit / 2, 0]
				translateZ: [0, 0]
				height: [0, nodeHeight]
			delay:
				enter: @props.duration / 2
		fadeLeftSmall:
			enter:
				opacity: [1, 0]
				translateX: [0, Style.baseSpacingUnit]
				translateZ: [0, 0]
				width: [nodeWidth, 0]
			leave:
				opacity: [0, 1]
				translateX: [Style.baseSpacingUnit, 0]
				translateZ: [0, 0]
				width: [0, nodeWidth]
			delay:
				enter: @props.duration / 2

		fade:
			enter:
				opacity: [1, 0]
				height: [0, 0]
			leave:
				opacity: [0, 1]
				height: [0, 0]
		fadeSwitch:
			enter:
				opacity: [1, 0]
				# height: [0, 0]
			leave:
				opacity: [0, 1]
				# height: [0, 0]

	_screenHeight: ->
		window?.innerHeight or '100px'

	_nodeHeight: ->
		@getDOMNode().offsetHeight

	_nodeWidth: ->
		@getDOMNode().offsetWidth

	transition: (animationType, finishCallback) ->
		@transitioning = true
		node = @getDOMNode()
		transitionProperties = @getTransitionProperties @props.transition, animationType

		Velocity node,
				transitionProperties
			,
				duration: @props.duration
				easing: @getEasing @props.transition, animationType
				delay: @getDelay @props.transition, animationType
				complete: =>
					if @isMounted()
						@transitioning = false
						if @props.clearStylesAfterTransition then node.removeAttribute('style')
						finishCallback?()

		return

	componentDidMount: ->
		_.delay =>
			if not @transitioning and @isMounted()
				@setState style: {}

	componentWillUnmount: ->
		clearTimeout @timeout if @timeout
		return

	componentWillEnter: (done) ->
		if @props.enter
			@transition 'enter', done
		else
			done()
		return

	componentWillLeave: (done) ->
		if @props.leave
			@transition 'leave', done
		else
			done()
		return

	getInitialState: ->
		style:
			opacity: 0

	render: ->
		React.createElement @props.childComponent or 'div',
			style: @state.style
		, React.Children.only @props.children

VelocityTransitionGroup = React.createClass
	displayName: 'VelocityTransitionGroup'
	propTypes:
		duration: React.PropTypes.number
		transitionEnter: React.PropTypes.bool
		transitionLeave: React.PropTypes.bool
		clearStylesAfterTransition: React.PropTypes.bool
		transition: React.PropTypes.oneOfType [
			React.PropTypes.string
			React.PropTypes.object
		]

	getDefaultProps: ->
		transition: 'fade'
		duration: Style.transitionSpeed * 2
		transitionEnter: true
		clearStylesAfterTransition: true
		transitionLeave: true
		component: 'div'

	_wrapChild: (child) ->
		React.createElement VelocityTransitionGroupChild,
			transition: @props.transition
			duration: @props.duration
			enter: @props.transitionEnter
			clearStylesAfterTransition: @props.clearStylesAfterTransition
			leave: @props.transitionLeave
			childComponent: @props.childComponent
		, child

	render: ->
		ReactTransitionGroup _.assign {}, @props,
			childFactory: @_wrapChild

module.exports = VelocityTransitionGroup
