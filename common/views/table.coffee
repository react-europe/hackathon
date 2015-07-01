
# require '../styles/components/_table.scss'

classNames = require 'classnames'
StringUtil = require '../utils/string'
Velocity = require 'velocity-animate'
ScrollButtons = React.createFactory require './table-scroll-buttons'
{ div, table, td, tr, th, thead, tbody, tfoot } = require 'elements'

module.exports = React.createClass

	displayName:  'TableView'

	propTypes:
		labelColumn: React.PropTypes.array.isRequired
		headerRow: React.PropTypes.array.isRequired
		dataRows: React.PropTypes.array.isRequired
		footerLabel: React.PropTypes.string
		footerRow: React.PropTypes.array
		rotateHeaders: React.PropTypes.bool
		scrollButtons: React.PropTypes.bool

	componentDidMount: ->
		@tableBody = @refs.body.getDOMNode()
		@tableHeadcol = @refs.headcol.getDOMNode()
		@wrapper = @refs.bodyWrapper.getDOMNode()
		@measure = @refs.measure.getDOMNode()

		window.addEventListener 'resize', @updateOverflow
		@updateOverflow()

	componentWillUnmount: ->
		window.removeEventListener 'resize', @updateOverflow

	componentDidUpdate: (oldProps) ->
		if oldProps isnt @props
			@updateOverflow()

	getInitialState: ->
		overflowLeft: false
		overflowRight: false
		scrollbarHeight: 0

	render: ->
		create = React.createElement
		props = @props
		classes =
			'table-wrapper': true
			'table--rotate-headers': props.rotateHeaders
			'table--has-scroll-buttons': props.scrollButtons and (@state.overflowLeft or @state.overflowRight)
			'table--overflow-left': @state.overflowLeft
			'table--overflow-right': @state.overflowRight
		classes[props.className] = true

		div {className: classNames classes},
			div
				key: 'measure'
				style:
					width: '100px'
					height: '100px'
					overflow: 'scroll'
					position: 'absolute'
					top: '-9999px'
				ref: 'measure'
			if props.scrollButtons
				ScrollButtons
					scroll: @scroll
					showLeft: @state.overflowLeft
					showRight: @state.overflowRight
			div {className: 'table__headcol', style: marginBottom: @state.scrollbarHeight},
				table {className: "#{props.componentClassName}", ref: 'headcol'},
					if props.headerRow
						thead {},
							tr {},
								th {},
									StringUtil.getSpaceString 1
					tbody {},
						_.map props.labelColumn, (label, i) ->
							tr {key: (label.key or label + i)},
								td {}, label.element or label
						if props.footerLabel
							tfoot {},
								tr {},
									td {}, props.footerLabel
			div {className: 'table__body', ref: 'bodyWrapper', onScroll: _.throttle @updateOverflow, 300, true},
				table {ref: 'body'},
					thead {},
						tr {className: 'td--headrow'},
							_.map props.headerRow, (header, i) ->
								th {key: header.key or header + i},
									header.element or header
									if props.rotateHeaders then div {key: 'spacer', className: 'table__header-spacer'}
					tbody {},
						_.map props.dataRows, (row, j) ->
							tr {key: 'row' + j + props.labelColumn[j]?.key},
								_.map row, (value, i) ->
									td {key: value.key or '' + value + i}, value.element or value
					tfoot {},
						tr {className: 'tr--totalrow'},
							_.map props.footerRow, (value, i) ->
								td {key: value.key or value + i}, value.element or value

	scroll: (offsetDirection) ->

		positionLeft = @tableBody.offsetLeft - @wrapper.scrollLeft
		bodySign = if offsetDirection is 'right' then 1 else -1

		Velocity @refs.body.getDOMNode(), 'scroll',
			offset: (@wrapper.offsetWidth - 60) * bodySign - positionLeft
			container: @wrapper
			complete: @updateOverflow
			axis: 'x'

	updateOverflow: ->
		positionLeft = @tableBody.offsetLeft - @wrapper.scrollLeft
		headcolWidth = @tableHeadcol.offsetWidth
		scrollWidth = @tableBody.scrollWidth
		bodyWrapperWidth = @wrapper.offsetWidth
		scrollValue = scrollWidth + positionLeft - bodyWrapperWidth - headcolWidth

		newState =
			overflowRight: scrollValue > 1
			overflowLeft: scrollValue < scrollWidth - bodyWrapperWidth - 1

		newState['scrollbarHeight'] = if newState.overflowLeft or newState.overflowRight then @measure.offsetWidth - @measure.clientWidth else 0

		if @state.overflowRight isnt newState.overflowRight or @state.overflowLeft isnt newState.overflowLeft
			@setState newState
