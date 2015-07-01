
Navigation = require('react-router').Navigation
classNames = require 'classnames'

TranslationMixin = require '../../mixins/TranslationMixin'
ApplicationViewMixin = require '../../common/ApplicationViewMixin'
app = require '../../base/Application'

Button = React.createFactory require 'qcommon/views/btn'
Icon = React.createFactory require 'qcommon/views/icon'
Input = React.createFactory require 'qcommon/views/text-input'
Feedback = React.createFactory require 'qcommon/views/feedback'
Popup = React.createFactory require 'qcommon/views/popup'
SubmitButton = React.createFactory require 'qcommon/views/submit-button'

{ div, h3, h4, ul, li, span, form } = require 'elements'

module.exports = React.createClass

	displayName: 'LoginFormView'

	mixins: [ TranslationMixin ]

	propTypes:
		apiData: React.PropTypes.object.isRequired
		autoLoginAction: React.PropTypes.object
		timezone: React.PropTypes.string
		email: React.PropTypes.string
		password: React.PropTypes.string
		customerId: React.PropTypes.string
		submitAction: React.PropTypes.func.isRequired
		setEmail: React.PropTypes.func.isRequired
		setPassword: React.PropTypes.func.isRequired
		setTimezone: React.PropTypes.func
		clear: React.PropTypes.func.isRequired
		clearApi: React.PropTypes.func.isRequired
		showTimezoneSelector: React.PropTypes.bool
		logout: React.PropTypes.bool


	componentWillMount: -> null

	componentDidMount: ->
		@props.clearApi()
		@props.clear()

	getInitialState: ->
		submitted: false
		validate: false
		showFullAutoLoginErrorMsg: false

	render: ->
		waiting = @props.apiData?.state is 'waiting'
		selectedTimezone = Ra.find ((item) => item.name is @props.timezone), @getTimezones()
		form
			className: 'login-form'
			id: 'login-form'
			onSubmit: @onSubmit
			target: @props.target
			# noValidate: 'noValidate'
		,
			div {onClick: @toggleFullAutoLoginErrorMsg},
				Feedback
					showFeedback: @errorMsgAutoLogin() isnt ''
					feedbackMessage: @errorMsgAutoLogin()
					showArrow: false
					className: 'flex-center top-margin'
			Feedback
				showFeedback: @state.showFullAutoLoginErrorMsg && @fullErrorMessageAutoLogin() isnt ''
				feedbackMessage: @fullErrorMessageAutoLogin()
				showArrow: false
				className: 'flex-center top-margin'
			Input
				type: 'email'
				formName: 'login-form'
				label: @t 'Email address'
				validate: @state.validate
				ref: 'emailInput'
				value: @props.email or ''
				feedbackMessage: if @state.validate then @validateEmail()
				onValueChanged: @emailChanged
			Input
				type: 'password'
				formName: 'login-form'
				label: @t 'Password'
				validate: @state.validate
				ref: 'passwordInput'
				value: @props.password or ''
				feedbackMessage: if @state.validate then @validatePassword()
				onValueChanged: @passwordChanged
			div {onClick: @toggleFullErrorMessage},
				Feedback
					showFeedback: @validateServer() isnt ''
					feedbackMessage: @validateServer()
					showArrow: false
					className: 'flex-center top-margin'

			SubmitButton
				modifiers: ['l', 'primary', 'full']
				className: 'js-login top-margin'
				onClick: @onSubmit
				loading: waiting
			,
				if @props.logout
					@t 'Log out'
				else
					@t 'Log in'

	getLi: (item) ->
		classes = classNames
			'selected': @props.timezone is item.name
			'js-close-popup wrapped-link': true
		li
			className: classes
			onClick: @onItemClicked
			key: item.name
			'data-timezone': item.name
		, span className: 'wrapped-link__link', @t item.name

	onItemClicked: (event) ->
		data = event.currentTarget.dataset
		@props.setTimezone data.timezone

	onSubmit: (e) ->
		e.preventDefault()
		@setState
			validate: true
		if @props.showTimezoneSelector
			timezone = (_.find @getTimezones(), (timezone) => @props.timezone is timezone.name)?.name
		if @isValid()
			@props.submitAction
				email: @props.email
				password: @props.password
				customerId: @props.customerId
				timezone: timezone

	emailChanged: (e) ->
		@props.clearApi()
		@props.setEmail e.target.value

	passwordChanged: (e) ->
		@props.clearApi()
		@props.setPassword e.target.value

	isValid: ->
		not (@validateTimezone() or @validatePassword() or @validateEmail())

	validateServer: ->
		login = @props.apiData
		if ! (login && login.state) then return ''

		if login.state is 'error' and login.statusCode is 0
			return @t('Something went wrong. Probably not your fault. ')
		else if login.state is 'error'
			return @t('Oops. The email or password you entered is incorrect.')

	toggleFullAutoLoginErrorMsg: ->
		@setState {showFullAutoLoginErrorMsg: !@state.showFullAutoLoginErrorMsg}

	fullErrorMessageAutoLogin: ->
		@props.autoLoginAction?.data?.err?.msg || ''

	errorMsgAutoLogin: ->
		autoLogin = @props.autoLoginAction
		if not autoLogin?.state? then return ''
		if autoLogin.state is 'error' and autoLogin.statusCode is 0
			return @t('Something went wrong when trying to automatically log you in. Probably not your fault. ')
		else if autoLogin.state is 'error'
			return @t('Oops. The automatic login failed! Click here to see the full error message.')


	validateTimezone: ->
		return '' unless @props.showTimezoneSelector
		if _.isString(@props.timezone) and @props.timezone.length > 0 then '' else @t 'You need to select a timezone'

	validatePassword: ->
		if @props.password?.length > 3 then '' else @t 'Your password must be at least 4 characters'

	validateEmail: ->
		re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		if re.test(@props.email) then '' else @t 'You must enter a real email address'

	getTimezones: ->
		[
			{
				'name': 'UTC'
				'offset': ''
			}
			{
				'name': 'Europe/London'
				'offset': ''
			}
			{
				'name': 'Europe/Berlin'
				'offset': '+1'
			}
			{
				'name': 'Europe/Copenhagen'
				'offset': '+1'
			}
			{
				'name': 'Europe/Oslo'
				'offset': '+1'
			}
			{
				'name': 'Europe/Stockholm'
				'offset': '+1'
			}
			{
				'name': 'Europe/Helsinki'
				'offset': '+2'
			}
			{
				'name': 'Europe/Moscow'
				'offset': '+4'
			}

		]
