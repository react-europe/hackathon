

win = global

initialSearchValue = win.location?.search or ''

queryObject = (uri) ->
	queryString = {}
	uri.replace new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) ->
		queryString[$1] = $3
		return

	queryString

parseQueryParamPart = (part) ->
	keyAndValue = part.split('=')
	key: win.unescape(keyAndValue[0])
	value: win.unescape(keyAndValue[1])

getQueryParamKeyValuePairs = (searchSection) ->
	params = searchSection.slice(1).split('&')
	_.map params, parseQueryParamPart

getQueryParameter = (key, locationSearch) ->
	queryParamKeyValuePairs = getQueryParamKeyValuePairs(locationSearch)
	result = _.compact _.map(queryParamKeyValuePairs, (pair) ->
		if pair.key is key
			return pair.value
		return
	)

	if result.length == 0
		return undefined

	if result.length == 1
		return result[0]
	else
		return result

getQueryParameter = (key) ->
	getQueryParameter(key, win.location.search)

getInitialQueryParameter = (key) ->
	getQueryParameter(key, initialSearchValue)

module.exports = {
	get: -> win.location.toString()
	getQueryObject: -> queryObject initialSearchValue
	setHref: (value) -> win.location.href = value
	getQueryParameter: getQueryParameter
	getInitialQueryParameter: getInitialQueryParameter
}
