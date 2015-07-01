
classNames = require 'classnames'
NavbarLink = React.createFactory require './navbar-link'

module.exports = React.createClass

	displayName: 'Navbar'

	propTypes:
		links: React.PropTypes.array.isRequired
		className: React.PropTypes.string
		selectedId: React.PropTypes.string
		onClick: React.PropTypes.func
		external: React.PropTypes.bool

	getDefaultProps: ->
		className: ''
		selectedId: ''
		external: false

	render: ->
		React.createElement 'nav', {className: "nav #{@props.className}"},
			_.map @props.links, (link) =>	@_renderLink link

	_renderLink: (link) ->
		NavbarLink
			to: link.id
			selected: @props.selectedId is link.id
			onClick: @props.onClick
			external: @props.external
			key: link.id
			id: link.id
			title: link.title
