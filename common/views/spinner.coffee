classNames = require 'classnames'
{ PureRenderMixin } = require('react/addons').addons

module.exports = React.createClass

	displayName: 'Spinner'

	mixins: [PureRenderMixin]

	propTypes:
		className: React.PropTypes.string
		display: React.PropTypes.bool
		delay: React.PropTypes.number

	getDefaultProps: ->
		display: false
		delay: 0

	getInitialState: ->
		display: !@props.delay

	componentWillReceiveProps: (nextProps) ->
		if not nextProps.display and @props.delay then @setState display: false

	componentDidMount: -> @enforceDelay()

	componentDidUpdate: -> @enforceDelay()

	enforceDelay: ->
		if @props.delay and @props.display and not @state.display
			setTimeout (=>
				if @isMounted()
					@setState display: true
			), @props.delay

	render: ->
		classes = 'spinner': true
		classes[@props.className] = @props.className?
		classes['spinner--display'] = @props.display and @state.display
		React.createElement 'div',
			onClick: @props.onClick
			className: classNames classes
