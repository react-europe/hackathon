{ PureRenderMixin } = require('react/addons').addons

module.exports = React.createClass

	mixins: [PureRenderMixin]

	displayName: 'Label'

	propTypes:
		label: React.PropTypes.string.isRequired
		htmlFor: React.PropTypes.string.isRequired

	render: ->
		React.createElement 'label',
			className: 'input__label'
			htmlFor: @props.htmlFor
		, @props.label
