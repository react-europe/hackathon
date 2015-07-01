helpers = require './helpers'

root = null

expose = (path, obj) ->
	helpers.setInPath path, root, obj

expose.view = (name) ->
	expose name, {__name: name}
	expose "views.#{name}", {__name: name}
	return {} =
		usesData: (appPaths) ->
			return {} =
				callsActions: (appPaths) ->
					return null




module.exports =
	exposeInNodeOn: (obj) ->
		obj.expose = expose
		root = obj
	exposeInBrowserOn: (obj) ->
		obj.expose = expose
		root = obj
