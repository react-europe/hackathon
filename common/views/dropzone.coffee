classNames = require 'classnames'
Interactable = require '../mixins/interactable'
Draggable = require '../mixins/draggable'
TagInitializer = require '../mixins/tag-initializer'

module.exports = React.createClass

	displayName: 'Drag button'

	mixins: [Interactable, TagInitializer]

	getInitialState: ->
		dropped: []

	componentDidMount: ->
		@interactable.dropzone
			accept: '.draggable'
			overlap: '0.75'
			ondragenter: (event) =>
				draggableElement = event.relatedTarget
				dropzoneElement = event.target
				unless -1 is index = _.indexOf @state.dropped, draggableElement
					@state.dropped.splice index, 1
				@setState
					dragover: true
					dropped: @state.dropped

			ondragleave: (event) =>
				@setState
					dragover: false

			ondrop: (event) =>
				draggableElement = event.relatedTarget
				if -1 is _.indexOf @state.dropped, draggableElement
					@state.dropped.push draggableElement
				@setState
					dragover: false
					dropped: @state.dropped

			ondropactivate: (event) =>
				@setState
					active: true

			ondropdeactivate: (event) =>
				@setState
					active: false

	render: ->
		classes = classNames
			'dropzone': true
			'dropzone--dragover': @state.dragover
			'dropzone--has-dropped': @state.dropped.length
			'dropzone--active': @state.active
		@div {className: classes}, 'Drop zone'
