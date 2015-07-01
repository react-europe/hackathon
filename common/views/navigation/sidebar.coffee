
SidebarSmall = React.createFactory require './sidebar-small'
SidebarMedium = React.createFactory require './sidebar-medium'
Breakpoints = require '../../mixins/breakpoints'

{ section } = require 'elements'

module.exports = React.createClass

	displayName: 'Sidebar'

	mixins: [Breakpoints]

	render: ->
		if @screenWidth 'xs', 'm'
			SidebarSmall {}, @props.children
		else
			SidebarMedium {}, @props.children
		# else
		# 	section {className: 'sidebar'}, @props.children
