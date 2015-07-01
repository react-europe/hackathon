Backbone = require('backbone')
moment = require('moment')
languageconfig = require('../utils/language')
notifications = require('../utils/notifications')

_default = _.find(languageconfig.get('languages'), (language) -> return _.has(language, 'default')).key || 'en'

# To specify language you can do one of the following, in order of relevancy:
#
# Instanciate this model with a 'language' key in attributes
# Instanciate this model together with a 'lang' key in the query string (see config.coffee)
# Instanciate this model together with a 'lang' key in the config
# Instanciate this model, defaults to 'en'
#
# To change language you set the 'lang' key of the languageconfig model
class I18n extends Backbone.Model
	defaults:
		language: null

	initialize: (attributes = {}) ->
		@listenTo(languageconfig, 'change:lang', @_handleChangeLanguage)

		@set('language', attributes['language'] or languageconfig.get('lang') or _default)
		@load()

	load: (options = {}) ->
		language = @get('language')

		if _.contains(_.pluck(languageconfig.get('languages'), 'key'), language)
			moment.locale(language)
			@set(require("./#{language}.json"))

			if _.has(options, 'changed')
				notifications.add
					message: @t("Successfully changed language to \"#{language}\"")
					type: notifications.types.success
		else
			moment.locale(_default)
			@set(require("./#{_default}.json"))

			notifications.add
				message: @t("Error fetching translations for \"#{language}\"")
				type: notifications.types.warning

	t: (value, group = {}) =>
		if value
			template = @get('Translations')?[value] or value
			_.template(template) group

	config: (key) ->
		return @get('Config')?[key] or key

	_handleChangeLanguage: (model, value, options) ->
		lang = model.get('lang')

		if lang isnt @get('language')
			@set('language', lang)

			@load(_.assign({}, options, {changed: 'lang'}))

module.exports = new I18n()
