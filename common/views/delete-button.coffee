{ PureRenderMixin } = require('react/addons').addons

Button = React.createFactory require './btn'
TooltipPopup = React.createFactory require './tooltip-popup'

module.exports = React.createClass

	displayName: 'DeleteButton'

	mixins: [PureRenderMixin]

	propTypes:
		className: React.PropTypes.string
		confirmLabel: React.PropTypes.string
		confirmText: React.PropTypes.string
		loading: React.PropTypes.bool

	# React functions
	getInitialState: ->
		confirm: false

	render: ->
		TooltipPopup
			className: @props.className
			linkContent: @getLinkContent()
			popupClass: 'js-delete-popup delete-button'
			popupContent: @getPopupContent()

	getLinkContent: ->
		Button
			modifiers: ['quiet-warning']
			className: "js-delete-button delete-button__first-button #{@props.className or ''}"
			onClick: @toggleConfirm
		, @props.children

	getConfirmButton: ->
		Button
			modifiers: ['warning']
			className: 'delete-button__confirm-button js-confirm-delete-button'
			onClick: @props.onClick
			loading: @props.loading
		,
			@props.confirmLabel

	getPopupContent: ->
		React.createElement 'div', {className: 'delete-button__confirm'},
			React.createElement 'h4', {className: 'delete-button__confirm-heading '}, @props.confirmText
			@getConfirmButton()

	toggleConfirm: ->
		@setState
			confirm: !@state.confirm
