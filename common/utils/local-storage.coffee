module.exports =
	# don't expect localStorage to always be present since we don' tknow if we're in a browser or not
	setObject: (key, value) ->
		localStorage?.setItem key, JSON.stringify(value)
	getObject: (key) ->
		value = localStorage?.getItem(key)
		value and JSON.parse(value)
	removeObject: (key) ->
		localStorage?.removeItem key
	clear: ->
		localStorage?.clear()
