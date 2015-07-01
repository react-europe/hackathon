instance = null

getInstance = ->
	instance ?= new NotificationsHelper()

class NotificationsHelper # Singleton

	setup: (onAdd) ->
		@_onAdd = onAdd

	add: (options) ->
		@_onAdd
			message: options.message
			type: options.type or @types.info
			more: options.more

	types:
		'info': 'info'
		'warning' : 'warning'
		'error': 'error'
		'success': 'success'

module.exports = getInstance()
