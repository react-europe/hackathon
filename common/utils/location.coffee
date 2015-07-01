
win = global
initialValue = win.location?.search or ''

module.exports =

	get: -> win.location?.toString()

	getInitialParam: (key) -> _getParams(initialValue)[key]

	getQueryParam: (key) -> _getParams(win.location.search)[key]

	getQueryParameters: (search = null) ->
		# Hack to pass unit test, we should look into including some sort of stub for globals
		_window = if _.isUndefined(window) then {location: {search: ''}} else window

		query = search or _window.location.search
		if query.length
			_.chain(query.substring(1).split('&'))
				.map((params) ->
					p = params.split('=')
					[p[0], decodeURIComponent(p[1])])
				.object()
				.value()
		else
			{}

	getURLParts: (url) -> {url: url.split('?')[0], query: url.split('?')[1]}

	removeParameters: (url, params = []) ->
		_.each params, (param) ->
			pattern = new RegExp("&?#{param}=[^&#$]+")
			url = url.replace(pattern, '')
		url

_getParams = (search) ->
	search?.slice(1).split('&').reduce (acc, query) ->
		splitQuery = query.split('=')
		acc[win.unescape(splitQuery[0])] = win.unescape(splitQuery[1])
		acc
