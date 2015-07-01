
TouchSupportMixin = require 'qcommon/mixins/touch-support'
app = require './Application'
moment = require 'moment'
PureRenderMixin = require('react/addons').addons.PureRenderMixin
ModalBaseView = React.createFactory require './ModalBaseView'
if DEV
	Grid = React.createFactory require('qcommon/views/grid')
Router = require('react-router')
RouteHandler = React.createFactory Router.RouteHandler
i18n = require '../utils/I18nUtil'

# FeatureToggler = require('qcommon/utils/feature-toggler')

module.exports = React.createClass

	displayName:  'AppView'

	mixins: [ TouchSupportMixin, Router.State,  Router.Navigation ]

	contextTypes:
		router: React.PropTypes.func

	componentWillMount: ->
		app.setRootComponent this

		# for easy debugging and development
		window.app = app
		window.appView = this

	componentDidMount: ->
		# Set lang
		i18n.load @state.config.lang
		@forceUpdate()


	componentWillUpdate: (nextProps, nextState) ->
		if nextState.api.punch?.in?.state is 'success' or nextState.api.punch?.out?.state is 'success'
			@context.router.transitionTo 'punch/done'
		@timestampWillUpdate = moment().unix()
		if nextState.config.lang isnt @state.config.lang
			i18n.load nextState.config.lang


	componentDidUpdate: (prevProps, prevState) ->
		diff = moment().unix() - @timestampWillUpdate
		# console.info "RENDER FINISHED in #{diff} millis"

	replaceAppStateWith: (data) ->
		if @isMounted() then app.transact.set '', data, 'AppView devData updated'

	render: ->
		React.createElement 'div', {className: 'body-content'},
			if DEV
				Grid lineColor: 'rgba(255,255,255,0.3)'
			React.createElement 'div', {className: 'appview'},
				RouteHandler @state
			ModalBaseView @state

