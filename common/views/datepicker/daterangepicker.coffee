moment = require 'moment'
MonthComponent = React.createFactory require './datepicker-month'

module.exports = React.createClass

	displayName: 'DateRangePicker'

	propTypes:
		timeperiod: React.PropTypes.object.isRequired
		onTimeperiodChange: React.PropTypes.func.isRequired
		translate: React.PropTypes.func

	getDefaultProps: ->
		firstSelectableDate: undefined
		translate: (str) -> str
		lastSelectableDate: undefined
		timeperiod:
			fromDate: moment()
			toDate: moment '2015-07-01', 'YYYY-MM-DD'

	render: ->
		React.createElement 'div', {className: 'datepicker-wrapper daterangepicker'},
			MonthComponent
				title: @props.translate 'From'
				timeperiod: @props.timeperiod
				firstSelectableDate: @props.firstSelectableDate
				lastSelectableDate: @props.lastSelectableDate
				onDateSelected: @onStartDateSelected
				isFromMonth: true
				translate: @props.translate
			MonthComponent
				title: @props.translate 'To'
				timeperiod: @props.timeperiod
				firstSelectableDate: @props.firstSelectableDate
				lastSelectableDate: @props.lastSelectableDate
				onDateSelected: @onEndDateSelected
				isFromMonth: false
				translate: @props.translate

	onStartDateSelected: (newDate) ->
		@onDateSelected newDate, 'fromDate'

	onEndDateSelected: (newDate) ->
		@onDateSelected newDate, 'toDate'

	onDateSelected: (newDate, position) ->
		timeperiod = _.clone @props.timeperiod
		timeperiod[position] = moment newDate
		if @props.timeperiod[position]?.isSame timeperiod[position]
			timeperiod[position] = undefined
		@props.onTimeperiodChange timeperiod
