{ PureRenderMixin } = require('react/addons').addons

module.exports = React.createClass

	displayName: 'OnScrollShow'

	mixins: [PureRenderMixin]

	lastScrollY: 0

	getInitialState: ->
		fixed: false
		top: 0
		state: 2 # 0 = Fixed at lower bound, 1 = Fixed at higher bound, 2 = between bounds

	componentWillMount: ->
		@_debouncedCheckScroll = _.throttle @_checkScroll, 5, trailing: true
		window.addEventListener 'scroll', @_debouncedCheckScroll

	componentWillUnmount: ->
		window.removeEventListener 'scroll', @_debouncedCheckScroll

	render: ->
		React.DOM.div
			onScroll: @_debouncedCheckScroll
			style:
				top: @state.top
			className: "onscroll-show#{if @state.fixed then ' onscroll-show--fixed' else ''}"
		,
			React.DOM.div ref: 'hide', @props.hideOnScrollComponent
			@props.children

	_checkScroll: (e) ->
		{top, fixed, hideHeight, state, snapToFixedAt} = @state
		if not @isMounted() then return
		offsetHeight = @refs.hide.getDOMNode().offsetHeight
		scrollY = window.scrollY
		if state is 0
			if scrollY < @lastScrollY then @_setState2 offsetHeight
		if state is 1
			if scrollY > @lastScrollY then @_setState2 0
		if state is 2
			if scrollY < top
				@_setState1()
			else if scrollY > top + offsetHeight
				@_setState0()


		@lastScrollY = scrollY

	_setState0: ->
		@setState
			state: 0
			fixed: true
			top: -@refs.hide.getDOMNode().offsetHeight

	_setState1: ->
		@setState
			state: 1
			fixed: true
			top: 0

	_setState2: (offsetHeight) ->
		@setState
			state: 2
			fixed: false
			top: window.scrollY - offsetHeight
