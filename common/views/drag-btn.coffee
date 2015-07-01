classNames = require 'classnames'
Interactable = require '../mixins/interactable'
Draggable = require '../mixins/draggable'

module.exports = React.createClass

	displayName: 'Drag button'

	mixins: [Interactable, Draggable]

	componentDidMount: ->
		@interactable.draggable
			restrict: @getRestrictions()
			inertia: true
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

	getRestrictions: ->
			 # https://github.com/taye/interact.js/pull/72#issue-41813493
		if @props.restrict
			restriction: 'parent'
			endOnly: true
			elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
		else
			undefined

	render: ->
		classes = classNames
			'btn btn--draggable draggable btn--normal': true
			'draggable--active': @state.active

		React.createElement 'div', _.assign {}, @props,
			style: @getInteractStyle()
			className: classes
