# From https://github.com/pstoica/react-interact
interact = require 'interact.js'
Style = require '../styles/generated/props'


interact.dynamicDrop true
interact.margin Style.baseSpacingUnit

Interactable =
	getInitialState: ->
		interactState: {}

	componentDidMount: ->
		@interactable = interact @getDOMNode()

	componentWillUnmount: ->
		@interactable.unset()
		@interactable = null

	updateInteractable: (options) ->
		@interactable.set options

	setInteractState: (state) ->
		interactState = @state.interactState
		@setState interactState:
			data: _.assign({}, interactState.data, state.data)
			style: _.assign({}, interactState.style, state.style)

	getInteractData: ->
		@state.interactState.data

	getInteractStyle: (style) ->
		_.assign {}, @state.interactState.style, style

module.exports = Interactable
