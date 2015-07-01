
Icon = React.createFactory require './icon'

module.exports = React.createClass

	displayName: 'Loader'

	render: ->
		Icon name: 'qlogo32', className: "icon--l loader #{@props.className or ''}"

