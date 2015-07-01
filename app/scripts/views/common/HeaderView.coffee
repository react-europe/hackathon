
Elements = require 'elements'
Icon = React.createFactory require 'qcommon/views/icon'
Router = React.createFactory require('react-router').RouteHandler
Link = React.createFactory require('react-router').Link
SearchView = React.createFactory require('./SearchView')
AccessRights = require '../../utils/AccessRights'
Ra = require 'ramda'

{ div, header, h4 } = Elements

module.exports = React.createClass

	displayName: 'HeaderView'

	render: ->
		header {className: 'header header--webpunch'},
			h4 className: 'header__center center', style: width: '100%', 'ReactJS Meetups'
			SearchView @props
