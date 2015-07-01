DomUtil = require '../../utils/dom'
ModalContent = React.createFactory require './modal-content'

sanitizeProps = (props) ->
	delete props.ref

module.exports = Modal = React.createClass

	displayName: 'Modal'

	propTypes:
		isOpen: React.PropTypes.bool.isRequired
		onClose: React.PropTypes.func
		ariaHideApp: React.PropTypes.bool
		closedCallback: React.PropTypes.func

	getDefaultProps: ->
		isOpen: true
		closeTimeoutMS: 0

	componentDidMount: ->
		DomUtil.addBodyClass 'no-scroll'
		@node = document.createElement('div')
		@node.className = 'ReactModalContent'
		document.body.appendChild @node
		@renderPortal @props

	componentWillReceiveProps: (newProps) ->
		@renderPortal newProps

	componentWillUnmount: ->
		DomUtil.removeBodyClass 'no-scroll'
		React.unmountComponentAtNode @node
		document.body.removeChild @node

	renderPortal: (props) ->
		sanitizeProps props
		if @portal
			@portal.setProps props
		else
			@portal = React.render(ModalContent(props), @node)

	render: ->
		null
