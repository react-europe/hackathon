FastClick = require 'fastclick'

module.exports =
	isTouchSupported: ->
		msTouchEnabled = window.navigator.msMaxTouchPoints
		generalTouchEnabled = 'ontouchstart' of document.createElement('div')
		return true  if msTouchEnabled or generalTouchEnabled
		false

	componentDidMount: ->
		document.addEventListener 'mouseover', @onMouseOver #If we have a touch-and-mouse situation we want to know
		if @isTouchSupported()
			setTimeout ->
				FastClick.attach document.body
			, 10
			document.addEventListener 'touchstart', @onTouchStart
			document.addEventListener 'touchend', @onTouchEnd
			document.addEventListener 'touchcancel', @onTouchEnd

		if @isTouchOS()
			document.body.classList.add 'touch'
		else
			document.body.classList.add 'no-touch'

	onMouseOver: ->
		document.body.classList.add 'mouse'
		document.removeEventListener 'mouseover', @onMouseOver

	onTouchEnd: ->
		# Remove all touch feedback
		nodes = document.querySelectorAll '.touch-feedback'
		for node in nodes
			node.classList.remove 'touch-feedback'

	onTouchStart: (e) ->
		# Find some better way of preventing body scroll when we have menus open.
		# return if document.body.classList.contains 'no-scroll'
		node = e.target
		while node?
			if node.dataset?.touchFeedback
				node.classList.add 'touch-feedback'
				return
			else if node.tagName is 'BODY'
				return
			node = node.parentNode


	isTouchOS: ->
		userAgent = navigator.userAgent or navigator.vendor or window.opera
		if (userAgent.match(/iPad/i) or
				userAgent.match(/iPhone/i) or
				userAgent.match(/iPod/i) or
				userAgent.match(/Android/i))
			true
		else
			false
