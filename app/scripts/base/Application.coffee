# This is the singleton application.
# In debug mode you should make sure to be able to access it from the console (e.g. app.actions....)
ReactWithAddons = require 'react/addons'

if DEV
	$ = require 'jquery'
moment = require 'moment'
helpers = require '../common/helpers'
actionRoutes = require './actionRoutes'
xhr = require '../common/xhr'
initialState = require './initialState'
config = require '../config/config'

LocalStorage = require 'qcommon/utils/local-storage'
Authentication = require './Authentication'

instance = null

getInstance = -> instance ?= new Application()

class Application
	constructor: ->

		_beforeTransact = (path, data, operation, triggeredFrom) =>
			triggeredFromText = if triggeredFrom then "  -  (triggered from #{triggeredFrom})" else ''
			json = JSON.stringify(data)
			console.groupCollapsed "TRANSACT: #{toUpper(operation)}: #{path}#{triggeredFromText} >>> #{substringTo(70, json)}"
			console.info json
			console.groupEnd()
			@logs.state.push(@state)


		_afterTransact = (dataPath, data, operation) =>
			affectedSubscribers = filter ( (x) -> startsWith dataPath, x.dataPath ), @subscribers
			forEach ( (x) -> x.callback(data) ), affectedSubscribers

			@_postDevData(@state)

			if not @component? then console.warn 'transaction was made but no component set'
			@component.setState(@state)

		# NOTE: the reason this looks weird: http://stackoverflow.com/questions/20977912/access-instance-property-in-coffeescript-within-nested
		@transact =
			set: (dataPath, data, triggeredFrom = null) =>
				_beforeTransact dataPath, data, 'set', triggeredFrom
				if dataPath == ''
					@state = data
				else
					@state = update.set dataPath, data, @state
				_afterTransact dataPath, data, 'set'
			merge: (dataPath, data, triggeredFrom = null) =>
				_beforeTransact dataPath, data, 'merge', triggeredFrom
				if dataPath == ''
					@state = data
				else
					@state = update.merge dataPath, data, @state
				_afterTransact dataPath, data, 'merge'

		@_addApiToData()

		@_addConfigToState()
		@_addSessionToState()


		headers = {'X-timezone': @state.auth?.timezone}
		@functions =
			actionRoutes: actionRoutes(@transact, @state.config.api, headers, @_logAction, @state.config.apiKey)
			authentication: Authentication(@transact, @state.config.api)

		@actions = helpers.buildActionRoutes actionRoutes(@transact, @state.config.api, headers, null, @state.config.apiKey), @_logAction

		@paths =
			data: helpers.buildPaths @state
			actions: helpers.buildPaths actionRoutes(null, null, null)

		@_postDevData(@state)



		# trying out new idea for live coding...
		# NOTE: the reason this looks weird: http://stackoverflow.com/questions/20977912/access-instance-property-in-coffeescript-within-nested
		# TODO: make Application in a functional way instead of this oo crap
		@declare =
			view: (view) =>
				if ! view then throw new Error 'view not defined'
				displayName = view.constructor?.displayName
				if ! displayName then throw new Error 'view does not have displayName property specified'

				ensurePath_ 'views', this
				# if @views[view.name] then throw new Error "app.view.#{view.name} already exists, cannot declare twice"
				setInPath_ "views.#{displayName}", view, this

				setInPath_ displayName, view, window


	logs:
		actions: []
		state: []
		transaction: [] # TODO: should contain dataPath, cmdObject and render time
		_redoState: []

	component: null
	state: initialState


	subscribers: []



	# ----------------------------------------------------------------------------------------------------------
	# PUBLIC API - Methods used by other parts of your application
	# ----------------------------------------------------------------------------------------------------------

	# actions are build in the constructor from the actionsRouter.coffee
	actions: {}

	forceUpdate: -> @component.forceUpdate()

	# should be called by root component on startup
	setRootComponent: (component) ->
		@component = component
		@component.setState(@state)

	subscribe: (dataPath, callback) -> @subscribers.push {dataPath: dataPath, callback: callback}

	# Transacts the global application state by using either path and/or a "ReactWithAddons.addons.update object"
	# This method should ensure that we always work with immubable data!
	# e.g. 	app.transact('path.to.nested.property', {$set: 'Quinyx'})
	#				app.transact({path: {to: {nested: {property: {$set: 'Quinyx'}}}}})
	transactDEPRECATED: (pathAndCmdOrString, cmd) =>
		pathAndCommandObject = null
		if isEmpty(pathAndCmdOrString) && cmd?
			return @_transactRoot cmd
		if isA(String, pathAndCmdOrString) && isA(Object, cmd)
			pathAndCommandObject = helpers.createNestedObject(split('.', pathAndCmdOrString), cmd)
			@_transact pathAndCommandObject
		else if isA(Object, pathAndCmdOrString) && not cmd?
			@_transact pathAndCmdOrString
		else
			throw new Error("transact called with bad arguments: #{pathAndCmdOrString} and #{cmd}")









	# ----------------------------------------------------------------------------------------------------------
	# DEVELOPER API - Methods primarily intended for debugging/development purposes. Not really used by other parts of
	# your application.
	# ----------------------------------------------------------------------------------------------------------

	# set state of app to the previous state (stored in logs.state)
	undo: =>
		if ! @logs.state.length
			console.log 'app.logs.state is empty, nothing to undo'
			return @_printStateLogs()
		oldState = @logs.state.pop()
		currentState = @state
		@logs._redoState.push currentState
		@state = oldState
		@component.setState @state
		@_postDevData(@state)
		@_printStateLogs()

	# set state of app to a previously 'undo-ed' state (stored in logs._redoState)
	redo: =>
		if ! @logs._redoState.length
			console.log 'app.logs._redoState is empty, nothing to redo'
			return @_printStateLogs()
		redoState = @logs._redoState.pop()
		currentState = @state
		@logs.state.push currentState
		@state = redoState
		@component.setState redoState
		@_postDevData(@state)
		@_printStateLogs()

	# reset state of app to initialState (we store initialState in initialState.coffee, if
	# you for dev purposes want to mess with the state, you should probably look at devData.coffee)
	resetState: ->
		@transact.set '', initialState

	saveState: (name) ->
		if name
			LocalStorage.setObject "webpunch_state_#{name}", @state
			console.info 'State saved'
		else
			console.warn 'You must provide a name to save the state.'

	loadState: (name) ->
		if state = LocalStorage.getObject "webpunch_state_#{name}"
			@transact.set '', state
		else
			console.warn "State #{name} not found."

	# resets logs.state and logs._redoState to empty arrays
	resetStateLogs: =>
		@logs.state = []
		@logs._redoState = []
		@_printStateLogs()











	# ------------------------------------------------------------------------------------------------------------
	# PRIVATE METHODS - Methods only intended to be used by this class
	# ------------------------------------------------------------------------------------------------------------

	_logAction: (params, data) =>
		console.group 'ACTION:' + params.path
		console.info data
		console.groupEnd()
		@logs.actions.push
			action: path
			state: data
			ts: moment().unix()

	# _transact: (pathAndCommandObject) =>
	# 	debugger
	# 	console.group 'TRANSACT ' # TODO: print path
	# 	console.info JSON.stringify(pathAndCommandObject)
	# 	console.groupEnd()

	# 	@logs.state.push(@state)
	# 	@state = ReactWithAddons.addons.update(@state, pathAndCommandObject)
	# 	@_postDevData(@state)

	# 	if not @component? then console.warn 'transaction was made but no component set'
	# 	@component.setState(@state)


	_transactRoot: (newValue) =>
		console.info 'TRANSACT ROOT'

		@logs.state.push(@state)
		@state = newValue

		if not @component? then console.warn 'transaction was made but no component set'
		@component.setState(@state)


	_postDevData: (data) ->
		# disabled for now since it's too unstable
		# a new version of this pattern is soon available, maybe upgrade to that.
		# if DEV
		# 	devDataUrl = "//#{window.location.hostname}:#{parseInt(window.location.port)+9}/devData"
		# 	$.ajax
		# 		type: 'POST'
		# 		url: devDataUrl
		# 		contentType: 'application/json'
		# 		data: JSON.stringify @state
		# 		# headers:
		# 		# 	'Webpunch-App-Version': '666.666'
		# 		# success: (data) -> console.log 'Data posted to devData'
		# 		error: (xhr) -> console.log 'Failed posting data to devData'

	_addApiToData: ->
		apiStructure = helpers.cloneStructure actionRoutes(null, null, null).api
		@state = ReactWithAddons.addons.update(@state, {api: {$set: apiStructure}})

	_addConfigToState: ->
		config = config.configObject
		@state = ReactWithAddons.addons.update(@state, {config: {$set: config}})

	_addSessionToState: ->
		authData = LocalStorage.getObject 'webpunch_auth'
		@state = ReactWithAddons.addons.update(@state, {auth: {$set: authData}})


	_printStateLogs: =>
		console.log "app.logs.state (#{@logs.state.length}): ", @logs.state
		console.log "app.logs._redoState: (#{@logs._redoState.length})", @logs._redoState

# for repl development purposes. TODO: reorganize this a bit, it's not very nice
window.app = getInstance()

# we'll return a singleton of Application
module.exports = getInstance()
# module.exports = new Application()
