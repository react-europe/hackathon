
Backbone = require 'backbone'

Config = require './config'

class LanguageConfig extends Backbone.Model #This is a backbone model so that we can listen to language changes, is this the wrong solution?
	defaults:
		'lang': Config.get 'lang'
		'languages': Config.get 'languages'

module.exports = new LanguageConfig()
