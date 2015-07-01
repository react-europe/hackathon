Icon = React.createFactory require 'qcommon/views/icon'
GroupUtils = require '../../utils/GroupUtil'

{ span, li } = require 'elements'

module.exports = React.createClass

	displayName: 'GroupPropertyModal'

	render: ->
		{ group, property } = @props
		li {},
			Icon name: "#{property}-s", className: 'icon--s icon--no-left-padding def-list__icon'
			span className: 'strong', GroupUtils.getPropertyString {group, property}
