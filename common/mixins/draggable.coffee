# From https://github.com/pstoica/react-interact
Interactable = require './interactable'


getTranslateStyle = (data) ->
	translate = (if (data.x is 0 and data.y is 0) then null else "translate(#{parseInt(data.x, 10)}px, #{parseInt(data.y, 10)}px)")
	transform translate
transform = (translate) ->
	msTransform: translate
	mozTransform: translate
	webkitTransform: translate
	transform: translate

warning = 'Interactable mixin must be included first.'
module.exports =
	dragMove: (e, options) ->
		unless @interactable
			console.warn warning
		interactData = @getInteractData()
		dx = ((if options.fixAxis isnt 'y' then e.dx else 0))
		dy = ((if options.fixAxis isnt 'x' then e.dy else 0))
		data =
			x: (interactData.x or 0) + dx
			y: (interactData.y or 0) + dy

		@setInteractState
			data: data
			style: getTranslateStyle(data)


	resetDrag: ->
		unless @interactable
			console.warn warning
		interactData = @getInteractData()
		interactStyle = @getInteractStyle()
		data =
			x: 0
			y: 0

		style = _.assign {}, getTranslateStyle(data),
			position: null
			left: null
			top: null
		@setInteractState
			data: data
			style: style

		return

	fixToTarget: (target) ->
		style = _.assign {}, getTranslateStyle(x: 0, y: 0),
			position: 'absolute'
			left: target.offsetLeft
			top: target.offsetTop
		@setInteractState style: style
