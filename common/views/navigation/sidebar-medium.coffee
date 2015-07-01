DomUtil = require '../../utils/dom'
CloseBtn = React.createFactory require '../close-btn'

{ section } = require 'elements'

module.exports = React.createClass

	displayName: 'SidebarMedium'

	getInitialState: -> open: false

	render: ->
		section
			className: "sidebar sidebar--medium#{if @state.open then ' sidebar--open' else ''}"
		,
			@props.children
