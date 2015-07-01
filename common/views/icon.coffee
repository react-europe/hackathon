{ PureRenderMixin } = require('react/addons').addons

module.exports = React.createClass

	displayName: 'Icon'

	mixins: [PureRenderMixin]

	render: ->
		icon =  require "../icons/#{@props.name}.svg"
		React.createElement 'span',
			dangerouslySetInnerHTML:
				__html: icon
			className: "icon #{@props.className or ''} icon--#{@props.name} #{if @props.inverted then 'icon--inverted' else ''}"
			onClick: @props.onClick
