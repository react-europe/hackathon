moment = require 'moment'
MonthComponent = React.createFactory require './datepicker-month'

module.exports = React.createClass

	displayName: 'DatePicker'

	propTypes:
		timeperiod: React.PropTypes.object.isRequired
		onTimeperiodChange: React.PropTypes.func.isRequired
		translate: React.PropTypes.func

	getDefaultProps: ->
		firstSelectableDate: moment()
		translate: (str) -> str
		lastSelectableDate: undefined
		timeperiod:
			fromDate: moment().startOf 'day'
			toDate: moment().startOf 'day'

	render: ->
		React.createElement 'div', {className: 'datepicker-wrapper daterangepicker'},
			MonthComponent
				title: @props.translate 'Date'
				timeperiod: @props.timeperiod
				onDateSelected: @onDateSelected
				isSingleMonth: true
				lastSelectableDate: moment('2015-05-31', 'YYYY-MM-DD')
				firstSelectableDate: moment('2015-05-01', 'YYYY-MM-DD')
				translate: @props.translate

	onDateSelected: (newDate) ->
		timeperiod = _.clone @props.timeperiod
		timeperiod.fromDate = moment newDate
		timeperiod.toDate = moment newDate
		@props.onTimeperiodChange timeperiod
