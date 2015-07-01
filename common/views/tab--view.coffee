
VelocityTransitionGroup = require './transition/velocity-transition'
AnimateContentMixin = require '../mixins/animate-content'
Button = React.createFactory require './btn'

module.exports = React.createClass

	displayName: 'TabView'

	mixins: [AnimateContentMixin]

	propTypes:
		items: React.PropTypes.array.isRequired
		names: React.PropTypes.array.isRequired
		defaultSelected: React.PropTypes.number
		onTabClicked: React.PropTypes.func

	getInitialState: ->
		selected: @props.defaultSelected or 0

	render: ->
		React.createElement 'div', {className: 'tab-view'},
			@getTabs()
			@getTabContent()

	getTabs: ->
		React.createElement 'div', {className: 'btn-group flex-center'},
			for name, i in @props.names
				Button
					modifiers: ['quiet']
					className: 'btn-group__btn'
					selected: @state.selected is i
					key: i
					dataset: {tab: i}
					onClick: @onTabClicked
				, name

	getTabContent: ->
		React.createElement 'div', {ref: 'animate', key: @state.selected,  'data-animate-show-content': true}, @props.items[@state.selected]

	onTabClicked: (e) ->
		selected = parseInt e.target.dataset.tab
		@setState
			selected: selected

		@props.onTabClicked?(selected, e)
