BackButton = React.createFactory require 'qcommon/views/back-btn'
Navigation = require('react-router').Navigation
TranslationMixin = require '../../mixins/TranslationMixin'

module.exports = React.createClass

	displayName: 'WPBackButton'

	propTypes:
		onClick: React.PropTypes.func

	mixins: [Navigation, TranslationMixin]

	render: ->
		BackButton
			onClick: @onClick
			translate: @t

	onClick: ->
		@props.onClick?()
		@goBack()
