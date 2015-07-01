
InternalLink = React.createFactory require './internal-link'

{ span } = require 'elements'

module.exports = React.createClass

	displayName: 'WrappedLink'

	propTypes:
		className: React.PropTypes.string.isRequired
		onClick: React.PropTypes.func

	render: ->
		InternalLink _.assign({}, @props, {className: "wrapped-link #{@props.className}"})
		,
			span
				className: 'wrapped-link__link'
			, @props.children
