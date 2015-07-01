i18n = require '../utils/I18nUtil'

module.exports =
	t: ->
		i18n.t.apply(this, arguments)
