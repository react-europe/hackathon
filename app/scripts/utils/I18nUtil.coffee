moment = require 'moment'

langs = [
	'en'
	'sv',
	'no',
	'dk'
]

_default = 'sv' # TODO real

instance = null

class I18n

	constructor: ->
		@load _default

	load: (lang) ->
		language = if _.contains(langs, lang) then lang else _default
		moment.locale language
		@translations = require("../../i18n/#{language}.json").Translations

	t: (value, group = {}) =>
		if value
			template = @translations?[value] or value
			_.template(template) group

getInstance = ->
	instance ?= new I18n()

module.exports = getInstance()
