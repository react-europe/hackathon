
Tooltip = React.createFactory require './tooltip-button'
Button = React.createFactory require './btn'
Modal = React.createFactory require './modal/modal'
Icon = React.createFactory require './icon'

module.exports = React.createClass

	displayName: 'CreateNewButtonView'

	propTypes:
		contentProps: React.PropTypes.object.isRequired
		modalContent: React.PropTypes.func.isRequired
		label: React.PropTypes.string.isRequired

	getInitialState: ->
		showModal: false

	componentWillMount: ->
		@props.contentProps.doneCallback = @onCreated

	componentWillReceiveProps: (nextProps)->
		nextProps.contentProps.doneCallback = @onCreated

	render: ->
		React.createElement 'div', {className: "create-new-button #{@props.className}"},
			Button
				modifiers: ['s', 'normal']
				onClick: @openModal
			, @props.label
			if @state.showModal
				Modal
					onClose: @closeModal
					closeOnBodyClicked: false
					key: 'modal'
				, @props.modalContent @props.contentProps

	onCreated: ->
		@closeModal()

	openModal: (e) ->
		@setState
			showModal: true

	closeModal: (e) ->
		@setState
			showModal: false
