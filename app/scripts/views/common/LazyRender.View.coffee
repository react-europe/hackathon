Style = require 'qcommon/styles/generated/props'

module.exports = React.createClass

	displayName: 'LazyRender'

	getInitialState: -> @props

	componentWillReceiveProps: (newProps) -> setTimeout (=> @setState React.Children.only(newProps.children).props), Style.transitionSpeed

	shouldComponentUpdate: (newProps, newState) -> @state isnt newState

	render: -> React.cloneElement React.Children.only(@props.children), @state
