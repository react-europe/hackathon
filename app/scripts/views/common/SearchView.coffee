DomUtil = require 'qcommon/utils/dom'

Elements = require 'elements'
Icon = React.createFactory require 'qcommon/views/icon'
Searchbox = React.createFactory require 'qcommon/views/searchbox'
Router = React.createFactory require('react-router').RouteHandler
Link = React.createFactory require('react-router').Link
SearchView = React.createFactory require('./SearchView')
AccessRights = require '../../utils/AccessRights'
Ra = require 'ramda'
Mixin = require '../../common/ApplicationViewMixin'

{ div, header, h4 } = Elements

module.exports = React.createClass

	displayName: 'SearchView'

	mixins: [ Mixin ]

	actions:
		setFilter: app.paths.actions.data.filterString.set

	getInitialState: ->
		open: false

	# componentDidMount: ->
	# 	document.addEventListener 'click', @onBodyClicked

	# onBodyClicked: (e) ->
	# 	if @isMounted() and @state.open and not DomUtil.isDescendant @getDOMNode(), e.target.parentNode
	# 		@closeSearch()
	# 		# @actions.setFilter null


	# componentDidUpdate:  ->
	# 	if @state.open
	# 		document.addEventListener 'click', @onBodyClicked
	# 	else
	# 		document.removeEventListener 'click', @onBodyClicked

	# componentWillUnmount: ->
	# 	document.removeEventListener 'click', @onBodyClicked

	render: ->
		if @state.open
			div {className: 'header__right header__right--full', key: 'wrapper'},
				Searchbox
					placeholder: 'Find by name or city'
					className: 'header__searchbox'
					autoFocus: true
					value: @props.filterString
					onChange: @onSearchValueChanged
					onClear: @onSearchValueCleared
		else
			div {className: 'header__right', key: 'wrapper', onClick: @openSearch},
				Icon name: 'search-s', className: 'icon--s icon--action right-margin--half'

	openSearch: ->
		@setState open: true

	closeSearch: ->
		@setState open: false

	onSearchValueChanged: (e) ->
		@actions.setFilter e.currentTarget.value

	onSearchValueCleared: (e) ->
		@closeSearch()
		@actions.setFilter null
