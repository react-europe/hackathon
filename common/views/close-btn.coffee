{ PureRenderMixin } = require('react/addons').addons

{ div, span } = require 'elements'

module.exports = React.createClass

	mixins: [PureRenderMixin]

	displayName: 'CloseBtn'

	propTypes:
		onClick: React.PropTypes.func.isRequired
		open: React.PropTypes.bool.isRequired
		closing: React.PropTypes.bool.isRequired
		className: React.PropTypes.string

	render: ->
		cn = @props.className

		div
			className: "close-btn #{if @props.open and not @props.closing then 'close-btn--open' else ''} #{if @props.closing then 'close-btn--closing' else ''} #{@props.className or ''}"
			onClick: @props.onClick
			'data-touch-feedback': true
		,
			span ''
