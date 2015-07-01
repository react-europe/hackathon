{ PureRenderMixin } = require('react/addons').addons


Button = React.createFactory require './btn'
Icon = React.createFactory require './icon'
Velocity = require 'velocity-animate'

module.exports = React.createClass

	displayName:  'TableView'

	mixins: [PureRenderMixin]

	propTypes:
		showLeft: React.PropTypes.bool.isRequired
		showRight: React.PropTypes.bool.isRequired
		scroll: React.PropTypes.func.isRequired

	render: ->
		React.createElement 'div', {className: 'table-scroll-buttons'},
			Button
				modifiers: ['quiet']
				className: "table-scroll-buttons__button #{ 'hidden' unless @props.showLeft}"
				onClick: @onScrollLeftClicked
			,  Icon {className: 'icon--s icon--quiet-action', name: 'arrow-left-s' }
			Button
				modifiers: ['quiet']
				className: "table-scroll-buttons__button #{ 'hidden' unless @props.showRight}"
				onClick: @onScrollRightClicked
			, Icon {className: 'icon--s icon--quiet-action', name: 'arrow-right-s' }

	onScrollRightClicked: ->
		@props.scroll 'right'

	onScrollLeftClicked: ->
		@props.scroll 'left'
