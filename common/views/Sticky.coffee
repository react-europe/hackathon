require '../modules/stickyfill'

module.exports = React.createClass

	displayName: 'Sticky'

	getDefaultProps: ->
		top: 0
		className: ''

	render: ->
		React.DOM.div className: 'sticky ' + @props.className , style: {top: @props.top}, ref: 'sticky', @props.children

	componentDidMount: ->
		window?.Stickyfill.add @refs.sticky.getDOMNode()

	componentWillUnmount: ->
		window?.Stickyfill.remove @refs.sticky.getDOMNode()
