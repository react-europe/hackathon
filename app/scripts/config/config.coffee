Location = require '../utils/location'
BaseConfig = require './BaseConfig'

ConfigFile = if DEV
	require './development/config'
else
	require './dist/config'

# TODO combine arrays

module.exports =
	configObject: _.assign BaseConfig, ConfigFile, Location.getQueryObject()

	getPrivateConfig: ->
		null

