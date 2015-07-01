{ PureRenderMixin } = require('react/addons').addons
module.exports = React.createClass

	displayName: 'Radiobutton'

	mixins: [PureRenderMixin]

	propTypes:
		label: React.PropTypes.string.isRequired
		name: React.PropTypes.string.isRequired
		onItemSelected: React.PropTypes.func.isRequired
		className: React.PropTypes.string
		id: React.PropTypes.string
		item: React.PropTypes.number.isRequired
		defaultChecked: React.PropTypes.bool

	render: ->
		React.createElement 'label', { htmlFor: @props.id, 'data-touch-feedback': true, className: 'radiobutton'},
			React.createElement 'input', _.assign {}, @props,
				className: 'radiobutton__input'
				type: 'radio'
				'data-touch-feedback': true
				onChange: @onItemSelected
				defaultChecked: @props.defaultChecked
			React.createElement 'span', { className: 'radiobutton__indicator'}
			React.createElement 'span', { className: 'radiobutton__label'}, @props.label

	onItemSelected: ->
		@props.onItemSelected @props.item
