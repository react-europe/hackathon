
Navigation = require('react-router').Navigation

app = require '../../base/Application'
TranslationMixin = require '../../mixins/TranslationMixin'
ApplicationViewMixin = require '../../common/ApplicationViewMixin'

Icon = React.createFactory require 'qcommon/views/icon'
LoginFormView = React.createFactory require '../common/LoginFormView'

{ div, h3, h4, ul, li, span, form } = require 'elements'

module.exports = React.createClass

	displayName: 'LoginView'

	mixins: [ Navigation, TranslationMixin, ApplicationViewMixin ]

	contextTypes:
		router: React.PropTypes.func

	# data:
	# 	api: app.paths.data.api.auth.login
	# 	apiAutoLogin: app.paths.data.api.auth.autoLogin
	# 	email: app.paths.data.login.email
	# 	password: app.paths.data.login.password

	# actions:
	#
	# 	setEmail: app.paths.actions.data.login.email.set
	# 	setPassword: app.paths.actions.data.login.password.set
	# 	clear: app.paths.actions.data.login.clear
	# 	clearApi: app.paths.actions.data.api.auth.login.clear

	statics:
		attemptedTransition: null
		willTransitionTo: (transition) ->
			return
			# TODO Real login check
			# console.log app.state.ui.api.auth

	componentDidUpdate: (newProps) ->
		if @data.api.state is 'success' || @data.apiAutoLogin?.state is 'success'
			@context.router.transitionTo @props.config.baseRoute

	getInitialState: ->
		submitted: false
		validate: false

	render: ->
		div {},
			div {className: 'login'},
				h3 {className: 'bottom-margin center'}, @t 'Hello there. Please login.'
				LoginFormView
					apiData: @data.api
					autoLoginAction: @data.apiAutoLogin
					timezone: @props.login.timezone
					email: @props.login.email
					password: @props.login.password
					submitAction: @actions.login
					setEmail: @actions.setEmail
					setPassword: @actions.setPassword
					setTimezone: @actions.setTimezone
					clear: @actions.clear
					clearApi: @actions.clearApi
					showTimezoneSelector: true
