Velocity = require 'velocity-animate'
Style = require '../styles/generated/props'

module.exports = AnimateContentMixin =


	getInitialState: ->
		justMounted: true

	componentWillUpdate: ->
		return unless content = @refs.animate?.getDOMNode()
		@oldHeight = +content.offsetHeight
		@oldWidth = +content.offsetWidth

	componentDidUpdate: ->
		return unless content = @refs.animate?.getDOMNode()
		showContentDuringTransition = content.dataset.animateShowContent

		@newHeight = +content.offsetHeight
		@newWidth = +content.offsetWidth
		unless @newHeight is @oldHeight and @newWidth is @oldWidth
			content.style.overflow = if showContentDuringTransition then 'hidden' else undefined
			content.style.opacity = if showContentDuringTransition then 1 else 0
			Velocity content,
				height: [@newHeight, @oldHeight]
				width: [@newWidth, @oldWidth]
			,
				duration: Style.transitionSpeed * 1
				easing: Style.easing
				complete: ->
					if not showContentDuringTransition
						Velocity content,
							opacity: 1
						, 100

					content.style.height = 'auto'
					content.style.width =  'auto'
