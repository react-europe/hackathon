Modal = React.createFactory require 'qcommon/views/modal/modal'
Icon = React.createFactory require 'qcommon/views/icon'
GroupProperty = React.createFactory require './GroupProperty'
moment = require 'moment'
GroupUtils = require '../../utils/GroupUtil'
{ map } = require 'ramda'
{ div, span, ul, li, a, img, h3 } = require 'elements'

module.exports = React.createClass

	displayName: 'GroupDetailsModal'

	render: ->
		{group} = @props
		Modal {onClose: @props.closeDetails},
			div className: 'group-flag center', style: backgroundImage: "url('flag-#{group.country.toLowerCase()}.svg')"
			h3 {className: 'center'}, group.name
			div {className: 'group__description', dangerouslySetInnerHTML: {__html: group.description}}
			ul {className: 'def-list'},
				map ((property) -> GroupProperty {group, property} ), ['distance', 'city', 'members', 'created']
			a className: 'link small', href: group.link, 'View on meetup.com'
