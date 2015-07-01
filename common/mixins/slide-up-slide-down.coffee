
Velocity = require 'velocity-animate'

module.exports =
	componentWillEnter: (callback) ->
		content = @getDOMNode()

		Velocity content, 'stop'
		Velocity content,
			translateY: [0, '-50%']
			opacity: [1, 0]
		,
			duration: 200
			complete: => callback() if @isMounted()

	componentDidEnter: ->
		@clearInlineStyles()

	componentWillLeave: (callback) ->
		content = @getDOMNode()

		Velocity content, 'stop'

		@oldHeight = content.clientHeight

		if !@oldHeight or @oldHeight is 0
			callback()
		else
			Velocity content,
				translateY: ['-50%', 0]
				opacity: [0,1]
			,
				duration: 200
				complete: => callback() if @isMounted()

	clearInlineStyles: ->
		$(@getDOMNode()).removeAttr 'style'
