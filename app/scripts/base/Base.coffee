window.env = {DEV: true}

# initial data
app =
	data: {}
	component: null

window.app = app

_postDevData = (data) ->
	if env.DEV
		devDataUrl = "//#{window.location.hostname}:#{parseInt(window.location.port)+9}/devData"
		$.ajax
			type: 'POST'
			url: devDataUrl
			contentType: 'application/json'
			data: JSON.stringify data
			# headers:
			# 	'Webpunch-App-Version': '666.666'
			# success: (data) -> console.log 'Data posted to devData'
			error: (xhr) -> console.log 'Failed posting data to devData'

_beforeTransact = (data, path, operation, extraParams) ->
	{caller} = extraParams?
	triggeredFromText = if caller then "  -  (triggered from #{caller})" else ''
	console.group "TRANSACT: #{toUpper(operation)}: #{path}#{triggeredFromText}"
	console.info substringTo 100, JSON.stringify(data)
	console.groupEnd()
	# @logs.state.push(@state)


_afterTransact = (data, path, operation) =>
	if length(path) > 0
		affectedSubscribers = filter ( (x) -> startsWith path, x.path ), @subscribers
		forEach ( (x) -> x.callback(data) ), affectedSubscribers

	_postDevData(app.data)

	if ! app.component? then console.warn 'transaction was made but no component set'
	app.component.setState(app.data)


transact =
	set: (path, value, extraParams) =>
		_beforeTransact path, value, 'set', extraParams
		if path == ''
			throw new Error 'If we get this error, maybe we need this ability. If not, remove this ability :)'
			# @state = data
		else
			@state = update.set data, dataPath, @state
		_afterTransact path, value, 'set'

Base =
	transact: transact

# TODO: find nicer way to enable repl driven development
window.Base = Base

module.exports = Base
