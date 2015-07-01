
Navigation = require('react-router').Navigation
app = require '../../base/Application'
Mixin = require '../../common/ApplicationViewMixin'
GroupsView = React.createFactory require '../common/GroupsView'

module.exports = React.createClass

	displayName: 'HomeView'

	mixins: [ Navigation, Mixin ]

	actions:
		getGroups: app.paths.actions.api.groups.get
		setPosition: app.paths.actions.data.position.set

	componentWillMount: ->
		@actions.getGroups()
		navigator.geolocation.getCurrentPosition (position) => @actions.setPosition position


	render: ->
		GroupsView @props
