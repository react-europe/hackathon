GroupsListView = React.createFactory require './GroupsListView'
LazyRender = React.createFactory require './LazyRender'
SortingSelector = React.createFactory require './SortingSelector'
Filtered = require 'qcommon/mixins/filtered'
{compose, map, sortBy, filter} = require 'ramda'
{ div, span, ul, li } = require 'elements'

module.exports = React.createClass

	mixins: [ Filtered ]

	displayName: 'GroupsView'

	render: ->
		return null unless @props.groups
		# filterByFilter = (group) -> group.name.indexOf @props.filterString > -1
		{groups, sorting, filterString} = @props
		groups = groups.results
		if filterString then groups = _.filter groups, (group) ->
			str = filterString.toLowerCase()
			group.name.toLowerCase().indexOf(str) > -1 or
			group.city.toLowerCase().indexOf(str) > -1 or
			group.country.toLowerCase().indexOf(str) > -1
		groups = _.map groups, (group) => _.assign {}, group, distance: @calculateDistance group
		groups = _.sortByOrder groups, sorting, not (sorting in ['rating', 'members'])
		div {},
			SortingSelector @props
			# LazyRender _.assign({}, @props, {groups}) , GroupsListView()
			GroupsListView _.assign({}, @props, {groups})

	calculateDistance: (group) ->
		return unless @props.position?
		lat1 = group.lat
		lon1 = group.lon
		lon2 = @props.position.coords.longitude
		lat2 = @props.position.coords.latitude
		R = 6371000
		d1 = toRad lat1
		d2 = toRad lat2
		Dd = toRad (lat2 - lat1)
		Dg = toRad (lon2 - lon1)
		a = Math.sin(Dd / 2) * Math.sin(Dd / 2) + Math.cos(d1) * Math.cos(d2) * Math.sin(Dg / 2) * Math.sin(Dg / 2)
		c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
		d = R * c
		parseInt d / 1000 # metres


toRad = (number) -> number * Math.PI / 180
