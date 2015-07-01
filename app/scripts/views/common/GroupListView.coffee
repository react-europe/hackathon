Icon = React.createFactory require 'qcommon/views/icon'
GroupUtils = require '../../utils/GroupUtil'
GroupDetailsModal = React.createFactory require './GroupDetailsModalView'

{ div, span, ul, li, a, img } = require 'elements'

module.exports = React.createClass

	displayName: 'GroupListView'

	getInitialState: -> details: false

	render: ->
		{group} = @props
		li {className: 'group-list__item', 'data-touch-feedback': true, onClick: @toggleDetails},
			if @state.details then GroupDetailsModal {group, closeDetails: @toggleDetails}
			if group.group_photo?.thumb_link
				div className: 'group-list__thumb', style: backgroundImage: "url('#{group.group_photo.thumb_link}')"
			else
				Icon name: 'react',  className: 'group-list__thumb group-list__thumb--default'
			span className: 'group-list__name', group.name
			unless @props.sorting is 'name'
				div className: 'quiet group-list__property',
					GroupUtils.getPropertyString {group, property: @props.sorting}
					if @props.sorting is 'rating' then Icon name: 'rating-s',  className: 'icon--s group-list__property-icon def-list__icon'


	toggleDetails: ->
		@setState details: !@state.details
