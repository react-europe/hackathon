
{ PureRenderMixin } = require('react/addons').addons

Icon = React.createFactory require '../icon'

module.exports = React.createClass

	displayName: 'NotificationMessage'

	mixins: [PureRenderMixin]

	getDefaultProps: ->
		autoFade: true
		autoFadeTimeout: 3000

	propTypes:
		message: React.PropTypes.string.isRequired
		type: React.PropTypes.string.isRequired
		onRead: React.PropTypes.func.isRequired
		autoFade: React.PropTypes.bool
		autoFadeTimeout: React.PropTypes.number

	componentDidMount: ->
		if @props.autoFade
			_.delay @props.onRead, @props.autoFadeTimeout

	render: ->
		React.createElement 'li', {className: "notifications__message notifications__message--#{@props.type}", onClick: @props.onRead, 'data-touch-feedback': true},
			React.createElement 'div', {className: 'notifications__message-content'},
				@props.message
				if not @props.autoFade
					Icon
						className: 'notifications__message-clear icon--action'
						name: 'x'
