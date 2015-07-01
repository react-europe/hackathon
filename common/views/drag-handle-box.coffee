classNames = require 'classnames'
Interactable = require '../mixins/interactable'
Draggable = require '../mixins/draggable'

module.exports = React.createClass

	displayName: 'DragHandleBox'

	mixins: [Interactable, Draggable]

	componentDidMount: ->
		@interactable.draggable
			onstart: (e) =>
				@fixToTarget e.target
				@setState
					active: true
				return
			onmove: (e) =>
				@dragMove e, {}
			onend: =>
				@setState
					active: false
				return
			restrict: @getRestrictions()
			inertia: true
			allowFrom: '.draggable-handle-box__handle'

	getRestrictions: ->
		if @props.restrict
			restriction: 'parent'
			endOnly: true
			 # https://github.com/taye/interact.js/pull/72#issue-41813493
			elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
		else
			undefined

	render: ->
		React.createElement 'div',
			style: @getInteractStyle()
			className: classNames
				'draggable-handle-box draggable': true
				'draggable--active': @state.active
		,
			@props.children
			React.createElement 'div',
				className: 'draggable-handle-box__handle'
			,
