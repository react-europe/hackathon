
# require './UserMenu.scss'

Link = React.createFactory require('react-router').Link
Breakpoints = require '../../mixins/breakpoints'

{ div, img, span } = require 'elements'

module.exports = React.createClass

	displayName: 'UserMenuView'

	mixins: [ Breakpoints ]

	propTypes:
		user: React.PropTypes.object.isRequired
		translate: React.PropTypes.func.isRequired

	getDefaultProps: ->
		translate: (s) -> s

	render: ->
		user = @props.user
		imageSize = user.imageSize
		divProps = if @screenWidth('m')
			'data-tooltip': @props.translate('Log out')
			className: 'tooltip--left tooltip--big'
		else {}
		div divProps,
			Link {className: 'js-logout nav__link tooltip--left user-profile', to: '/logout', clearQuery: true,},
				div
					style:
						backgroundImage: "url(#{user.image})"
					className: 'user-profile__image'
				span {className: 'nav__link-text nav__link-text--left-padded'}, @props.translate 'Log out'
