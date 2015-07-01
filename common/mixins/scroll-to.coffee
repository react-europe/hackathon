
Style = require '../styles/generated/props'

module.exports =

	# Using a slightly modified version of https://github.com/bendc/anchor-scroll by @bdc

	componentWillUpdate: ->
		@removeListeners()

	componentDidUpdate: ->
		@attachListeners()

	componentDidMount: ->
		@attachListeners()

	componentWillUnmount: ->
		@removeListeners()

	removeListeners: ->
		domNode = @getDOMNode()
		return unless domNode

		links = domNode.querySelectorAll 'a.scroll'
		_.each links, (link) ->
			link.removeEventListener('click', null)


	attachListeners: ->
		domNode = @getDOMNode()
		return unless domNode

		links = domNode.querySelectorAll 'a.scroll'
		i = links.length
		root = (if /firefox|trident/i.test(navigator.userAgent) then document.documentElement else document.body)
		easeInOutCubic = (t, b, c, d) ->
			return c / 2 * t * t * t + b  if (t /= d / 2) < 1
			c / 2 * ((t -= 2) * t * t + 2) + b

		_.each links, (link) ->
			link.addEventListener 'click', (e) ->
				offset = e.currentTarget.dataset?.scrollToOffset or 0
				startTime = undefined
				startPos = root.scrollTop
				endPos = document.getElementById(/[^#]+$/.exec(@href)[0])?.getBoundingClientRect().top - offset
				maxScroll = root.scrollHeight - window.innerHeight
				scrollEndValue = (if startPos + endPos < maxScroll then endPos else maxScroll - startPos)
				duration = Style.transitionSpeed * 2
				scroll = (timestamp) ->
					startTime = startTime or timestamp
					elapsed = timestamp - startTime
					progress = easeInOutCubic(elapsed, startPos, scrollEndValue, duration)
					root.scrollTop = progress
					elapsed < duration and requestAnimationFrame(scroll)

				requestAnimationFrame scroll
				e.preventDefault()
