



# TODO: this is really ugly, rewrite buildRoutes in better fp style
# buildRoutesDeprecated = (routeMap, params, actionLogger) ->
# 	if !params then params = { path: [] }

# 	keys = _.keys(routeMap)

# 	if _.isEmpty(keys)
# 		if _.isFunction(routeMap)
# 			return (data) ->
# 				returnPath = _.cloneDeep(params)
# 				returnPath.path = returnPath.path.join('/')
# 				actionLogger(returnPath.path, data)
# 				routeMap(returnPath, data)
# 		else
# 			return () -> throw Error('No handler function defined for route')

# 	_.chain(keys)
# 		.map (key) ->
# 			if key == 'id'
# 				['id', (id) ->
# 					newParams = _.cloneDeep(params)
# 					lastKey = _.last(params.path)
# 					newParams.path.push(key)
# 					newParams.path.push(id)
# 					newParams["#{lastKey}Id"] = id
# 					return buildRoutes(routeMap[key], newParams, actionLogger)
# 				]
# 			else
# 				newParams = _.cloneDeep(params)
# 				newParams.path.push(key)
# 				[key, buildRoutes(routeMap[key], newParams, actionLogger)]
# 		.object()
# 		.value()

simplifyPath = (path) ->
	extractSimplePath = compose join('.'), filter( isNaN ), split('.')
	return extractSimplePath path

# http://stackoverflow.com/q/1007981/416797
STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/g
ARGUMENT_NAMES = /([^\s,]+)/g
getParamNames = (func) ->
  fnStr = func.toString().replace(STRIP_COMMENTS, "")
  result = fnStr.slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")")).match(ARGUMENT_NAMES)
  result = []  if result is null
  return result

buildActionRoutes = (routeMap, actionLogger, whiteListedPaths = null) ->
	params = arguments[3] || { path: [] }
	newObj = {}
	all (k) ->
		if whiteListedPaths
			simplePath = simplifyPath join('.', params.path) + '.' + k
			pathNotInWhiteList = all ( (x) -> ! startsWith(simplePath, x) ), whiteListedPaths
			if pathNotInWhiteList then return false

		# TODO: rethink and rewrite actionRotuer
		if isA(Function, routeMap[k])
			newObj[k] = routeMap[k]

		#j	paramsToSend = update.apply 'path', compose( join('/'), append(k) ), params
		#	# NOTE: this api part is a temp workaround, rethink the whole actionRouter in this more simple way
		#	# TODO: also when doing the restructuring make sure to add back the actionLogger
		#	if head(params.path) == 'api'
		#		newObj[k] = routeMap[k]
		#		# (data) ->
		#		# 	actionLogger(paramsToSend, data)
		#		# 	routeMap[k](data)
		#	else
		#		newObj[k] = (data) ->
		#			actionLogger(paramsToSend, data)
		#			routeMap[k](paramsToSend, data)

		else if k == 'id'
			# NOTE: we should be able to set _evalForCodeCompletion to true for this one
			newObj[k] = (id) ->
				key = last(params.path) + 'Id' # ex. employeeId = id
				params = update.set id, key, params
				buildActionRoutes routeMap[k], actionLogger, whiteListedPaths, update.push('path', [k, id], params)

		else
			newObj[k] = buildActionRoutes routeMap[k], actionLogger, whiteListedPaths, update.push('path', k, params)

	, keys(routeMap)
	return newObj




# takes a (potentially) nested object structure and returns the same structure but at every leaf node the path to that
# leafnode is set as a string.
# eg. {a: {b: {b1: {}, b2: {}}}} gives {a: {b: {b1: 'a.b.b1', b2: 'a.b.b2'}}}
buildPaths = (data, path = '') ->
	obj = {}
	forEach (x) ->
		newPath = "#{path}.#{x}"
		if isEmptyObject data[x] || isEmpty data[x]
			obj[x] = if head(newPath) == '.' then substringFrom 1, newPath else newPath
		else
			obj[x] = buildPaths data[x], newPath
	, keys(data)
	return obj

extractFlagPath =
	compose	join('.'),
					concat(['ui']),
					filter((a) -> !match(/[0-9]+/, a)),
					split('/')


cloneStructure = (obj) ->
	ks = keys obj
	if ks.length == 0 then return {}
	copy = {}
	forEach ((k) -> copy[k] = cloneStructure obj[k]), ks
	return copy

ensurePath = (path, obj) ->
	pointer = obj
	forEach (n) ->
		if ! has n, pointer then pointer[n] = {}
		pointer = pointer[n]
	, split('.', path)
	return obj

setInPath = (path, obj, value) ->
	pointer = obj
	names = split '.', path
	forEach (x) ->
		if ! has x, pointer then pointer[x] = {}
		pointer = pointer[x]
	, dropLast(1, names)

	pointer[last(names)] = value
	return obj


# addapted from http://stackoverflow.com/questions/5484673/javascript-how-to-dynamically-create-nested-objects-using-object-names-given-by
createNestedObject = (names, value) ->
	base = {}
	obj = base

	# If a value is given, remove the last name and keep it for later:
	lastName = (if value? then names.pop() else false)

	# Walk the hierarchy, creating new objec where needed.
	# If the lastName was removed, then the last object is not set yet:
	i = 0

	while i < names.length
		obj = obj[names[i]] = obj[names[i]] or {}
		i++

	# If a value was given, set it to the last name:
	if lastName then obj = obj[lastName] = value

	return base

helpers =
	buildActionRoutes: buildActionRoutes
	buildPaths: buildPaths
	ensurePath: ensurePath
	setInPath: setInPath
	simplifyPath: simplifyPath
	createNestedObject: createNestedObject
	cloneStructure: cloneStructure
	extractFlagPath: extractFlagPath

window.helpers = helpers
module.exports = helpers

