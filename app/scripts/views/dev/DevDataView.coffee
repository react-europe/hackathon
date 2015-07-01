classNames = require 'classnames'
TagInitializer = require 'qcommon/mixins/tag-initializer'
PureRenderMixin = require('react/addons').addons.PureRenderMixin

module.exports = React.createClass

	displayName: 'DevDataView'

	mixins: [PureRenderMixin, TagInitializer]

	propTypes:
		employee: React.PropTypes.object
		serverSyncEmployee: React.PropTypes.object

	getInitialState: ->
		display: false

	render: ->
		classes = classNames
			'dev-data': true
			'dev-data--display': @state.display

		@div {className: classes, onClick: @toggleDisplay},
			@div JSON.stringify(@props.employee)
			@div JSON.stringify(@props.serverSyncEmployee)

	toggleDisplay: ->
		@setState
			display: !@state.display

	componentDidMount: ->
		$('body').on 'keydown', @onKeyDown

	componentWillUnmount: ->
		$('body').off 'keydown', @onKeyDown

	onKeyDown: (e) ->
		if e.keyCode is 69
			@toggleDisplay()
