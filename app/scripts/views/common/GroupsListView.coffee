GroupListView = React.createFactory require './GroupListView'

{ ul } = require 'elements'

module.exports = React.createClass

	displayName: 'GroupsListView'

	render: ->
		return null unless @props.groups?
		ul {className: 'group-list'},
			@props.groups.map (group) =>
				GroupListView key: group.id, group: group, sorting: @props.sorting
