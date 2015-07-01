Button = React.createFactory require './btn'

module.exports = React.createClass

	displayName: 'ToggleButton'

	getInitialState: ->
		selected: @props.selected or false

	render: ->
		Button _.assign( {}, @props, {selected: @state.selected, onClick: @onClick}), @props.children

	onClick: (e) ->
		@setState selected: !@state.selected
		@props.onClick?(e)
