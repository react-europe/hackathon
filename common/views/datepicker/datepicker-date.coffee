classNames = require 'classnames'

module.exports = React.createClass

	displayName: 'DatePickerDate'

	propTypes:
		timeperiod: React.PropTypes.object.isRequired
		date: React.PropTypes.object.isRequired
		onDateSelected: React.PropTypes.func.isRequired
		isFromMonth: React.PropTypes.bool.isRequired
		isSingleMonth: React.PropTypes.bool

	getDefaultProps: ->
		isSingleMonth: false

	getInitialState: ->
		selected: false
		disabled: false

	render: ->
		classes = classNames
			'datepicker__date': true
			'datepicker__date--selected': @isSelected()
			'datepicker__date--disabled': @isDisabled()
			'datepicker__date--selected-first': @isFirstSelected()
			'datepicker__date--selected-last': @isLastSelected()
			'datepicker__date--active': @isActive()
			'datepicker__date--other-month': @props.isOtherMonth
			# 'tooltip--show': tooltip

		React.createElement 'div',
			className: classes
			'data-formatted-date': @props.date.format 'YYYY-MM-DD'
			'data-date': @props.date.format()
			# 'data-tooltip': tooltip
			'data-touch-feedback': true
			onClick: @onDateClicked
		, @props.date.get 'date'

	isSelected: ->
		startDate = @props.timeperiod.fromDate
		endDate = @props.timeperiod.toDate
		(!startDate? and @props.date.isBefore(endDate)) or \
		(!endDate? and @props.date.isAfter(startDate)) or \
		(@props.date.isBefore(endDate) and @props.date.isAfter(startDate)) or \
		@isFirstSelected() or \
		@isLastSelected()

	isFirstSelected: ->
		@props.date.isSame @props.timeperiod.fromDate

	isLastSelected: ->
		@props.date.isSame @props.timeperiod.toDate

	isDisabled: ->
		if @props.isSingleMonth or @props.isEmptyPeriod
			@props.firstSelectableDate? and @props.date.isBefore(@props.firstSelectableDate) or
			@props.lastSelectableDate? and @props.date.isAfter @props.lastSelectableDate or
			false
		else if @props.isFromMonth
			(@props.timeperiod.toDate? and @props.date.isAfter(@props.timeperiod.toDate)) or
			@props.firstSelectableDate? and @props.date.isBefore(@props.firstSelectableDate) or
			@props.firstSelectableDate? and @props.date.isSame(@props.firstSelectableDate)
		else
			(@props.timeperiod.fromDate? and @props.date.isBefore(@props.timeperiod.fromDate)) or
			@props.lastSelectableDate? and @props.date.isAfter @props.lastSelectableDate


	isActive: ->
		if @props.isFromMonth
			return false unless @props.timeperiod.fromDate?
			@props.date.isSame @props.timeperiod.fromDate, 'day'
		else
			return false unless @props.timeperiod.toDate?
			@props.date.isSame @props.timeperiod.toDate, 'day'

	onDateClicked: (e) ->
		unless @isDisabled()
			@props.onDateSelected e
