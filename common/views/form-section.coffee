
{ div, h4 } = require 'elements'

module.exports = React.createClass

	displayName: 'FormSection'

	propTypes:
		title: React.PropTypes.oneOfType [
				React.PropTypes.string.isRequired
				React.PropTypes.array.isRequired
				React.PropTypes.element.isRequired
			]

	getDefaultProps: ->
		title: ''

	render: ->
		div className: "form-section #{@props.className or ''}",
			h4 className: 'form-section__title', @props.title
			div className: 'form-section__control', @props.children
