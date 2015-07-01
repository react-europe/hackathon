
# require '../styles/components/_cards.scss'

{div} = require 'elements'

module.exports = React.createClass

	displayName: 'Card'

	propTypes:
		onClick: React.PropTypes.func
		className: React.PropTypes.string

	render: ->
		div	className: 'card ' + (@props.className or ''), onClick: @props.onClick, @props.children
