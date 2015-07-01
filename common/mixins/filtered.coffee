
Searchbox = React.createFactory require '../views/searchbox'

module.exports =

	getInitialState: ->
		filterString: null

	getSearchBox: (options = {}) ->
		Searchbox
			onChange: @handleSearchChange options.onChange
			onClear: @clearFilter options.onClear
			value: @state.filterString
			placeholder: options.placeholder or 'Sök'
			spinner: options.syncing
			className: options.className

	filterList: (rawList, getName) ->
		filteredList = []
		# Native map method takes both arrays, Backbone Collections and iterable objects.
		rawList.map (item) =>
			name = if getName then getName item else item.get 'name'
			if @filter(name) then filteredList.push item
		@matches = filteredList.length
		filteredList

	filter: (input) ->
		input = input.toLowerCase()
		filter = @state.filterString?.toLowerCase()
		hit = !filter or input.indexOf(filter) isnt -1
		if hit then @matches++
		hit

	clearFilter: (callback) ->
		=>
			_.delay =>
				@setState
					filterString: null
					matches: -1
				callback?()

	noMatches: ->
		@matches <= 0

	handleSearchChange: (callback) ->
		(e, value) =>
			@setState
				filterString: value

			_.delay =>
				@setState
					matches: @matches
				@matches = 0
				callback?(value)

	isSearchClear: ->
		@state.filterString.length is 0
