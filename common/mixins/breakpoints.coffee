Style = require '../styles/generated/props'

module.exports =
	_setScreenWidth: ->
		if @isMounted() then @setState {screenWidth: window.innerWidth}

	getInitialState: -> screenWidth: window?.innerWidth or 1280

	screenWidth: (minName, maxName) ->
		maxWidth = if maxName then _.find(Style.breakpoints, name: maxName).value else Infinity
		minWidth = if minName then _.find(Style.breakpoints, name: minName).value else 0
		@state.screenWidth >= minWidth and @state.screenWidth < maxWidth

	componentWilllUnmount: ->
		window.removeEventListener 'resize', @debouncedSetScreenWidth

	componentDidMount: ->
		@debouncedSetScreenWidth = _.debounce @_setScreenWidth, 300
		window.addEventListener 'resize', @debouncedSetScreenWidth
