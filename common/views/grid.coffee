Style = require '../styles/generated/props'

module.exports = React.createClass

	displayName: 'grid'

	propTypes:
		className: React.PropTypes.string
		lineColor: React.PropTypes.string

	getDefaultProps: ->
		lineColor: 'rgba(0,0,0,0.2)'

	getInitialState: ->
		visible: false

	render: ->
		if @state.visible
			React.DOM.div
				className: 'grid-overlay'
				onKeyDown: @keyDown
				onKeyUp: @keyUp
				style:
					position: 'absolute'
					top: 0
					left: 0
					right: 0
					width: '100vw'
					height: '100%'
					zIndex: 10000000000
					background: "repeating-linear-gradient(
												0deg,
												transparent,
												transparent #{Style.baseSpacingUnit - 1}px,
												#{@props.lineColor} #{Style.baseSpacingUnit - 1}px,
												#{@props.lineColor} #{Style.baseSpacingUnit}px,
												transparent #{Style.baseSpacingUnit}px
											) top left"
					transform: 'translateY(-2px)'
					backfaceVisibility: 'hidden'
		else null

	keyUp: (e) ->
		if e.keyCode is 71
			@setState visible: false

	keyDown: (e) ->
		if e.keyCode is 71 and not @state.visible
			@setState visible: true

	componentDidMount: ->
		document.addEventListener 'keyup', @keyUp
		document.addEventListener 'keydown', @keyDown

	componentWillUnmount: ->
		document.removeEventListener 'keyup', @keyUp
		document.removeEventListener 'keydown', @keyDown

