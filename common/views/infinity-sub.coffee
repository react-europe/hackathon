{ PureRenderMixin } = require('react/addons').addons
prefix = require 'react-prefixr'

InfinitySub = React.createClass

	displayName: 'InfinitySub'

	mixins: [PureRenderMixin]

	getInitialState: ->
		transform: @props.transform

	componentDidMount: (argument) ->
		@setState
			transform: @props.transform

	componentWillReceiveProps: (newProps) ->
		@setState transform: newProps.transform

	render: ->
		style = prefix
			position: 'absolute'
			top: '0'
			left: '0'
			transform: @state.transform
			width: @props.width
			height: @props.height

		React.DOM.div {style, className:'infinity-sub'}, @props.children

module.exports = InfinitySub
