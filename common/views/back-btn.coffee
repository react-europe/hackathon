
# require '../styles/components/_back-btn.scss'

Button = React.createFactory require './btn'
Icon = React.createFactory require './icon'

module.exports = React.createClass

	displayName: 'BackButton'

	propTypes:
		onClick: React.PropTypes.func
		translate: React.PropTypes.func
		label: React.PropTypes.string

	getDefaultProps: ->
		translate: (str) -> str

	render: ->
		Button
			modifiers: ['quiet']
			className: 'back-btn'
			onClick: @onClick
		,
				Icon name: 'arrow-left-s', className: 'icon--no-left-padding icon--s icon--quiet-action'
				@props.label or @props.translate 'Back'

	onClick: ->
		@props.onClick?()
