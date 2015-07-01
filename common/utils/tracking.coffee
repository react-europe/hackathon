
errorHandlers = []
window.onerror = () ->
	onErrorArguments = arguments
	onErrorThis = this
	_.each errorHandlers, (errorHandler) ->
		errorHandler.apply onErrorThis, onErrorArguments

OnError = (errorHandler) -> errorHandlers.push errorHandler

_initialized = false

trackPageView = (url) ->
	return unless _initialized

	window.ga('send', 'pageview', url)

trackEvent = (category, action, label) ->
	return unless _initialized and category and action

	window.ga 'send', 'event', {
		'eventCategory': category
		'eventAction': action
		'eventLabel': label
	}

_loadTracker = (trackingId) ->
	throw new Error('Undefined google analytics container id!') if trackingId is undefined

	# snippet that initializes google analytics
	# https://developers.google.com/analytics/devguides/collection/analyticsjs/advanced
	((i, s, o, g, r, a, m) ->
		i['GoogleAnalyticsObject'] = r
		i[r] = i[r] or ->
			(i[r].q = i[r].q or []).push arguments

		i[r].l = 1 * new Date()

		a = s.createElement(o)
		m = s.getElementsByTagName(o)[0]

		a.async = 1
		a.src = g
		m.parentNode.insertBefore a, m
	) window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga'

	window.ga('create', trackingId, 'auto')
	# TODO: do this manually from the entry point
	# window.ga('send', 'pageview')

_trackErrorEvent = (message, file, line) ->
	trackEvent 'JS Error', file + ':' + line, message

module.exports =
	initialize: (trackingId) ->
		_loadTracker(trackingId)

		OnError _trackErrorEvent

		_initialized = true

	trackEvent: trackEvent

	trackPageView: trackPageView

	# Look into separating these when we have multiple entry points
	# This is just a starting point, add more events as you see fit
	CATEGORIES:
		INSIGHTS: 'Insights'
		Organisation: 'Organisation'
		AUTH: 'Authentication'
		NAVIGATION: 'Navigation'

	EVENTS:
		AUTH:
			LOGIN: 'Login'
			LOGIN_ERROR: 'Login error'
			LOGOUT: 'Logout'
			LOGOUT_ERROR: 'Logout error'

		NAVIGATION:
			GROUP_SWITCH: 'Group switch'
			GROUP_SWITCH_MOBILE: 'Group switch mobile'

		INSIGHTS:
			TIMEPERIOD_BREADCRUMB_SWITCH: 'Timeperiod breadcrumb switch'
			TIMEPERIOD_ARROWS_SWITCH: 'Timeperiod arrows switch'
			TIMEPERIOD_DATEPICKER_SWITCH: 'Timeperiod datepicker switch'
			TIMEPERIOD_LIST_SWITCH: 'Timeperiod list switch'
			TIMEPERIOD_DRILLDOWN_SWITCH: 'Timeperiod drill down switch'
			TIMEPERIOD_CHART_SWITCH: 'Timeperiod chart switch'
			REPORT_SWITCH: 'Report switch'
			REPORT_CREATED: 'Report created'
			REPORT_CREATE_ERROR: 'Report create error'
			REPORT_DELETED: 'Report deleted'
			REPORT_DELETE_ERROR: 'Report delete error'
			REPORT_EDIT_SETTINGS: 'Report edit settings'
			REPORT_EDIT_SETTINGS_ERROR: 'Report edit settings error'
			COMPONENT_ADDED: 'Component added'
			COMPONENT_DELETED: 'Component deleted'
			COMPONENT_DELETE_ERROR: 'Component deleted error'
			COMPONENT_EDIT: 'Component edit'

		Organisation:
			GROUP_SWITCH: 'Group switch'
			GROUP_CREATED: 'Group created'
			GROUP_CREATE_ERROR: 'Group create error'
			GROUP_DELETED: 'Group deleted'
			GROUP_DELETE_ERROR: 'Group delete error'
			GROUP_EDIT: 'Group edit'
			GROUP_EDIT_ERROR: 'Group edit error'
			PARENT_CHANGED: 'Changed parent'
			PARENT_CHANGE_ERROR: 'Changed parent error'
			MEMBERS_EDIT: 'Members edited'
			MEMBERS_EDIT_ERROR: 'Members edit error'
