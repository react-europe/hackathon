
Tooltip = React.createFactory require './tooltip-button'
Button = React.createFactory require './btn'
Modal = React.createFactory require './modal/modal'
Icon = React.createFactory require './icon'

module.exports = React.createClass

	displayName: 'CreateNewButtonView'

	propTypes:
		contentProps: React.PropTypes.object.isRequired
		modalContent: React.PropTypes.func.isRequired
		tooltip: React.PropTypes.string.isRequired
		icon: React.PropTypes.string

	getDefaultProps: ->
		icon: 'plus'

	getInitialState: ->
		showModal: false

	componentWillMount: ->
		@props.contentProps.doneCallback = @onCreated

	componentWillReceiveProps: (nextProps)->
		nextProps.contentProps.doneCallback = @onCreated

	render: ->
		React.createElement 'div', {className: "create-new-button #{@props.className}"},
			Tooltip
				tooltip: @props.tooltip
				linkContent: @getAddButton()
				className: 'create-new-button__tooltip'
				onClick: @openModal
				key: 'tooltip'
			if @state.showModal
				Modal
					onClose: @closeModal
					closeOnBodyClicked: false
					key: 'modal'
				,
					@props.modalContent @props.contentProps

	getAddButton: ->
		Button
			modifiers: ['round-icon', 'quiet']
		, Icon {name: @props.icon, className: 'icon--s icon--quiet-action'}

	onCreated: ->
		@closeModal()

	openModal: (e) ->
		@setState
			showModal: true

	closeModal: (e) ->
		@setState
			showModal: false
