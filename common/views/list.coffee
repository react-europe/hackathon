classNames = require 'classnames'
VelocityTransitionGroup = React.createFactory require './transition/velocity-transition'

module.exports = React.createClass

	displayName: 'List'

	propTypes:
		onItemClicked: React.PropTypes.func
		className: React.PropTypes.string
		animateItems: React.PropTypes.bool

	getDefaultProps: ->
		className: 'select-list'

	getInitialState: ->
		visible: 0

	componentDidMount: ->
		if @props.animateItems
			setVisibleState = (i) =>
				=>
					@setState
						visible: i
			for i in [0..@props.children.length]
				_.delay setVisibleState(i), i * 15

	render: ->
		VelocityTransitionGroup {transition: 'fadeDownSmall', component: 'ul', childComponent: 'li', className: @props.className},
			if @listIsEmpty()
				React.createElement 'div', {key: 'empty'}, @props.empty
			else
				_.map @props.children, (item, i) =>
					classes = classNames
						'list-item': true
						'list-item--hidden': @props.animateItems and @state.visible < i
					React.createElement 'div',
						onClick: @props.onItemClicked
						className: classes
						key: if _.isObject(item) and item.key? then item.key else item
						'data-i': i
					, item


	listIsEmpty: ->
		if @props.animateItems
			@state.visible isnt 0 and @props.children.length is 0
		else
			@props.children.length is 0
