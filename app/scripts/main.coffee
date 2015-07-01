require '../styles/main.scss'

require 'browsernizr/test/touchevents'
require 'browsernizr/test/serviceworker'
require 'browsernizr/test/pointerevents'
require 'browsernizr/test/geolocation'
require 'browsernizr/test/websockets'
Modernizr = require 'browsernizr'


# SetupHandler = require 'error-handler/ajax-setup-handler'
# FeatureToggler = require 'feature/feature-toggler'
functionalBootstrap = require('./common/functionalBootstrap').exposeInBrowserOn(window)
liveCodeingBootstrap = require('./common/liveCodeingBootstrap').exposeInBrowserOn(window)
expose = require('./common/expose').exposeInBrowserOn(window)
ReactRouter = require './base/ReactRouter'

# Tracking = require 'tracking/tracking'

if DEV
	# required by the react dev tools plugin
	require 'expose-loader?React!react'

if Function.name is undefined
	Object.defineProperty Function::, 'name',
	get: ->
		name = @toString().match(/^\s*function\s*(\S*)\s*\(/)[1]
		# For better performance only parse once, and then cache the
		# result through a new accessor for repeated access.
		Object.defineProperty this, 'name',
			value: name
		name

if window.navigator.standalone
	document.body.classList.add 'ios-web-app'
# FeatureToggler.initialize()
# Tracking.initialize()
React.initializeTouchEvents(true)
ReactRouter.initialize()
