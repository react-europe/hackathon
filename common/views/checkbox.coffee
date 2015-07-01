Icon = React.createFactory require './icon'
{ PureRenderMixin } = require('react/addons').addons

module.exports = React.createClass

	displayName: 'Checkbox'

	mixins: [PureRenderMixin]

	propTypes:
		label: React.PropTypes.string.isRequired
		className: React.PropTypes.string
		id: React.PropTypes.string
		defaultChecked: React.PropTypes.bool

	render: ->
		React.createElement 'label', { htmlFor: @props.id, className: 'checkbox'},
			React.createElement 'input', _.assign {}, @props,
				className: 'checkbox__input'
				type: 'checkbox'
				defaultChecked: @props.defaultChecked or false
			React.createElement 'span', { className: 'checkbox__indicator'},
				Icon name: 'check', className: 'icon--s checkbox__indicator-icon'
			React.createElement 'span', { className: 'checkbox__label'}, @props.label
