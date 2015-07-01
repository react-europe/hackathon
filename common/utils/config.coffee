
locationUtil = require './location'
config = require 'qconfig'

module.exports =
	get: (path) ->
		# supports nesting: 'grandparent.parent.child'
		getPath = (obj, key) -> obj[key]
		configVal = path.split('.').reduce getPath, config
		override = locationUtil.getInitialParam path

		# return if only one
		if not (configVal and override) then return override or configVal

		# concat if config array
		if configVal instanceof Array then return _.unique configVal.concat(_toArray(override))

		# cannot have override array and configVal object
		if override instanceof Array then throw new Error ['Query param value was array but it is an object in the config file!', path, override, configVal].join('-')

		# return override if both exist as objects
		override

_toArray = (obj) ->	if obj instanceof Array then obj else [obj]
