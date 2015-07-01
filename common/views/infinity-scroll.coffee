
{ PureRenderMixin } = require('react/addons').addons
{arrayOf, object, any, number, func, shape} = React.PropTypes

InfinitySub = React.createFactory require('./infinity-sub')

InfinityScroll = React.createClass
	displayName: 'InfinityScroll'

	propTypes:
		data: arrayOf(shape(
			key: any.isRequired
			height: number)).isRequired
		defaultElementHeight: number # this can be overridden by setting {height: ...} on the item data
		margin: number # margin between rows
		topMargin: number # margin at top of the browser window
		onScrollCallback: func # callback to get info about current state on infinity list
		onEndCallback: func # callback to get called when (almost) at end of list
		extraTopPixels: number # how much should be pre-rendered above visible area
		extraBottomPixels: number # how much should be pre-rendered below visibla area

	mixins: [PureRenderMixin]

	accumulatedHeight: 0

	getDefaultProps: ->
		data: []
		margin: 0
		topMargin: 0
		extraTopPixels: 600 * 2
		extraBottomPixels: 600 * 2

	getInitialState: ->
		scrollTop: 0

	componentDidMount: ->
		@_debouncedScroll = _.throttle @onScroll, 100, trailing: true
		global.addEventListener 'scroll', @_debouncedScroll
		global.addEventListener 'resize', @onResize

		@setState windowHeight: global.innerHeight

	componentWillUnmount: ->
		global.removeEventListener 'scroll', @_debouncedScroll
		global.removeEventListener 'resize', @onResize

	onResize: ->
		@setState windowHeight: global.innerHeight

	onScroll: ->
		{scrollY} = global
		if @isMounted() && @state.scrollTop != scrollY
			@setState {scrollTop:scrollY}
			if Math.abs(@accumulatedHeight - (@state.windowHeight + @state.scrollTop)) < 200
				@props.onEndCallback?()

	render: ->
		{data, defaultElementHeight, margin, topMargin, onScrollCallback, extraTopPixels, extraBottomPixels} = @props
		{scrollTop, windowHeight} = @state

		dataInView = []
		elementsToRender = []
		windowTop = scrollTop - topMargin
		windowBottom = windowTop + windowHeight
		@accumulatedHeight = topMargin
		if data && data.length > 0
			for i in [0..data.length - 1] # traditional for-loop and only one pass for speed
				{key, height} = currentData = data[i]
				if i > 0 then @accumulatedHeight += margin
				heightToUse = (height || defaultElementHeight)

				if @accumulatedHeight >= windowTop - extraTopPixels && @accumulatedHeight < windowBottom + extraBottomPixels
					child = InfinitySub
						key: key
						transform: "translate(0px, #{@accumulatedHeight}px)",
						width: '100%',
						height: heightToUse + 'px',
					, React.createElement @props.childComponent, currentData, null

					elementsToRender.push child
					if @accumulatedHeight >= windowTop && @accumulatedHeight < windowBottom
						dataInView.push currentData

				@accumulatedHeight += heightToUse

		if onScrollCallback then onScrollCallback {dataInView}
		style =
			height: @accumulatedHeight
			width: '100%'
			position: 'relative'

		return React.createElement 'div', {style}, elementsToRender

module.exports = InfinityScroll
