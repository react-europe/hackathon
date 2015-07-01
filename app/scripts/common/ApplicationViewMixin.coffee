# The beatiful result of using immutable data structures is this file :)
# There are more advanced implementations of this on the internet but for now this seems enough for wp
app = require '../base/Application'
helpers = require './helpers'


# ----------------------------------------------------------------------------------------------------------
# HELPERS
# ----------------------------------------------------------------------------------------------------------
buildData = (dataMapping) ->
	if ! dataMapping then return
	if ! isA(Object, dataMapping)
		throw new Error "the data you've declared in #{@name} is not an object, @data: #{JSON.stringify(dataMapping)}"

	# replace value (path string) with the actual value at that path in the app.state
	mapObj ( (val) -> path(val.split('.'), app.state) ), dataMapping

subscribeToPathsInAppData = (dataMapping, component) ->
	# subscribe and update component.data when needed (this occurs before re-render)
	mapObjIndexed (val, key) ->
		app.subscribe val, (newValue) -> setInPath_(key, newValue, component.data)
	, dataMapping

buildActions = (actionMapping) ->
	if ! actionMapping then return
	if ! isA(Object, actionMapping)
		throw new Error "the actions you've declared in #{name} is not an object, @actions: #{JSON.stringify(actionMapping)}"

	# replace value (action path) with the actual action function
	mapObj ( (val) ->
		console.log val
		path(val.split('.'), app.actions) ), actionMapping

buildStateCursors = (component) ->
	setFn = (path) -> (value) -> component.setState update.set(path, value, component.state)
	applyFn = (path) -> (pred) -> component.setState update.apply(path, pred, component.state)
	statePaths = cloneStructureWithPaths component.state
	cloneStructure statePaths, (path) -> { set: setFn(path), apply: applyFn(path) }


ApplicationViewMixin =
	componentWillMount: (newProps) ->
		# ----------------------------------------------------------------------------------------------------------
		# DATA
		# ----------------------------------------------------------------------------------------------------------
		dataMapping = @data
		@data = buildData dataMapping
		subscribeToPathsInAppData dataMapping, this

		# ----------------------------------------------------------------------------------------------------------
		# ACTIONS
		# ----------------------------------------------------------------------------------------------------------
		actionPaths = @actions
		@actions = buildActions actionPaths

		# ----------------------------------------------------------------------------------------------------------
		# STATE CURSORS
		# ----------------------------------------------------------------------------------------------------------
		@stateCursors = buildStateCursors this


		app.declare.view this


module.exports = ApplicationViewMixin
