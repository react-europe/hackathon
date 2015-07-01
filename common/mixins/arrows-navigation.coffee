
module.exports = ArrowsNavigationMixin =

	getInitialState: ->
		currentSelection: -1

	componentWillMount: ->
		@clearActiveItem()

	componentDidUpdate: (prevprops, prevstate) ->
		if @state.currentSelection > -1
			@scrollTop()

	componentWillUnmount: ->
		@getDOMNode().removeEventListener 'keydown', @onKeyDown

	onKeyDown: (e) ->
		switch e.keyCode
			when 38 then @navigate(e,'up')
			when 40 then @navigate(e, 'down')
			when 13 then @state.onClickEnter?(@state.currentSelection)

	navigate: (e, direction) ->
		e.preventDefault()
		index = @_getCurrentIndex()
		len = @itemsList.length
		if len == 0
			index = -1

		if direction == 'up'
			if index > 0
				index -= 1
			else
				index = len - 1

		if direction == 'down'
			if index != len - 1
				index += 1
			else
				index = 0

		@_setSelected index

	scrollTop: ->
		item = @refs.active?.getDOMNode()
		itemContainer = @refs.container?.getDOMNode()
		if item
			firstElement = $(itemContainer).children().first()
			scrolValue = $(item.parentElement).position().top - $(firstElement).position().top
		else
			scrolValue = 0

		$(itemContainer).scrollTop(scrolValue)

	clearActiveItem: ->
		@setState
			currentSelection: -1
		@scrollTop()

	getActiveItemid: ->
		@state.currentSelection

	checkActiveItem: ->
		foundSelected = false
		_.map @itemsList, (item) =>
			itemid = item.get?('id') or item.id
			if itemid is @state.currentSelection
				foundSelected = true

		if foundSelected is false
			if @state.currentSelection isnt -1
				@_setSelected(0)

	setNavigationOn: (options) ->
		@setState
			onClickEnter: options.onClickEnter
		options.objectToListen.addEventListener 'keydown', @onKeyDown

	setNavigationOptions: (options) ->
		@itemsList = options.itemsList

	_getCurrentIndex: ->
		index = -1
		_.map @itemsList, (item,i) =>
			itemid = item.id or item.get?('id')
			if itemid is @state.currentSelection
				index = i
		return index

	_setSelected: (index) ->
		itemid = @itemsList[index].id or @itemsList[index].get 'id'
		@setState
			currentSelection: itemid
