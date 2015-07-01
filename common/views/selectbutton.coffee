{ PureRenderMixin } = require('react/addons').addons

Button = React.createFactory require './btn'
#
module.exports = React.createClass

	displayName: 'Radiobutton'

	mixins: [PureRenderMixin]

	propTypes:
		onItemSelected: React.PropTypes.func.isRequired
		className: React.PropTypes.string
		item: React.PropTypes.number.isRequired
		selected: React.PropTypes.bool

	render: ->
		Button
			modifiers: ['quiet', 'pill']
			selected: @props.selected
			onClick: @onItemSelected
			className: 'form-section__select-btn' + (@props.className or '')
		, @props.children

	onItemSelected: ->
		@props.onItemSelected @props.item
