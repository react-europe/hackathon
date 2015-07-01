
# require '../../styles/components/_datepicker.scss'

classNames = require 'classnames'
moment = require 'moment'
DateComponent = React.createFactory require './datepicker-date'
Icon = React.createFactory require '../icon'
Button = React.createFactory require '../btn'

{ div, span, h4 } = require 'elements'

module.exports = React.createClass

	displayName: 'DatePickerMonth'

	propTypes:
		timeperiod: React.PropTypes.object.isRequired
		onDateSelected: React.PropTypes.func.isRequired
		firstSelectableDate: React.PropTypes.object
		lastSelectableDate: React.PropTypes.object
		isFromMonth: React.PropTypes.bool
		isSingleMonth: React.PropTypes.bool
		translate: React.PropTypes.func

	getDefaultProps: ->
		translate: (str) -> str
		isFromMonth: false
		isSingleMonth: false

	getInitialState: ->
		firstDate: @_getFirstDate()
		isEmptyPeriod: @isEmptyPeriod()

	render: ->
		buttonModifiers = ['quiet', 's']
		datepickerClasses = classNames
			'datepicker': true
			'datepicker--start-month': @props.isFromMonth
			'datepicker--end-month': !@props.isFromMonth
		nextClasses = classNames
			'datepicker__next': true
			'datepicker__next--disabled': @_hideNextMonth()
		previousClasses = classNames
			'datepicker__previous': true
			'datepicker__previous--disabled': @_hidePreviousMonth()

		div {className: datepickerClasses},
			div {className: 'datepicker__title'},
				span {className: 'datepicker__title-month'}, @props.title if @props.title
				span
					className: 'datepicker__title-selected-date link'
					'data-touch-feedback': true
					'data-test': 'datepicker-month__selected-date-title'
					onClick: @onMonthTitleClicked
				, @_getSelectedDateString()
			div {className: 'datepicker__head'},
				Button
					modifiers: buttonModifiers
					disabled: @_hidePreviousMonth()
					className: previousClasses
					onClick: @onPreviousMonthClicked
				, Icon {className: 'icon--s icon--quiet-action', name: 'arrow-left-s'}
				h4 {className: 'datepicker__month-name'}, @_getMonthString()
				Button
					modifiers: buttonModifiers
					className: nextClasses
					disabled: @_hideNextMonth()
					onClick: @onNextMonthClicked
				,  Icon {className: 'icon--s icon--quiet-action', name: 'arrow-right-s'}
			div {className: 'datepicker__dates'},
				@_getDayLabels()
				@_getDates false

	componentWillReceiveProps: (nextProps)->
		@setState
			isEmptyPeriod: @isEmptyPeriod(nextProps)
			firstDate: @_getFirstDate(nextProps)

	_getSelectedDateString: ->
		date = if @props.isFromMonth then @props.timeperiod.fromDate else @props.timeperiod.toDate

		return '' unless date?

		unless date.get('year') is moment().get 'year'
			date.format? @props.translate 'MMMM Do YYYY'
		else
			date.format? @props.translate 'MMMM Do'

	_getSelectedDate: ->
		date = undefined
		if @props.isFromMonth
			date = @props.timeperiod.fromDate.clone()
		else
			date = @props.timeperiod.toDate.clone()

	_getDayLabels: ->
		day = moment().weekday 0
		items = []

		for i in [0..6]
			item = div
				className: 'datepicker__daylabel'
				key: "#{@props.isFromMonth}-weekday-#{i}"
			, day.format 'dd'
			items.push item
			day = day.add 1, 'days'
		items

	_getDates: (next) ->
		date = moment @state.firstDate
		date = date.add(1, 'months') if next

		items = @_getLastMonthDates date, []
		items = @_getThisMonthDates date, items
		items = @_getNextMonthDates date, items

	_getLastMonthDates: (date, items) ->
		firstWeekday = moment date
			.weekday()
		return items if firstWeekday is 0
		for i in [firstWeekday..1]
			items.push @_getDateComponent
				date: moment(date).subtract(i, 'days').startOf 'day'
				isOtherMonth: true
		items

	_getNextMonthDates: (date, items) ->
		date = moment date
			.endOf 'month'
			.startOf 'day'
		lastWeekday = date.weekday()
		return items if lastWeekday is 6
		for i in [1..6 - lastWeekday]
			items.push @_getDateComponent
				date: moment(date).add(i, 'days').startOf 'day'
				isOtherMonth: true
		items

	_getThisMonthDates: (date, items) ->
		for i in [1..date.daysInMonth()]
			tempDate = moment(date).startOf 'day'
			tempDate.set 'date', i
			items.push @_getDateComponent
				date: tempDate
		items

	_getDateComponent: (props) ->
		props = _.assign {}, props,
			onDateSelected: @onDateSelected
			timeperiod: @props.timeperiod
			lastSelectableDate: @props.lastSelectableDate
			firstSelectableDate: @props.firstSelectableDate
			isFromMonth: @props.isFromMonth
			isSingleMonth: @props.isSingleMonth
			isEmptyPeriod: @isEmptyPeriod()
			key: "#{'start' if @props.isFromMonth}-date-#{props.date.format('YYYY-MM-DD')}"
		DateComponent props

	_getMonthString: ->
		if @state.firstDate.get('year') is moment().get 'year'
			@state.firstDate.format @props.translate 'MMMM'
		else
			@state.firstDate.format @props.translate 'MMMM YYYY'

	_getFirstDate: (props)->
		lprops = props or @props

		if lprops.isFromMonth
			moment(lprops.timeperiod.fromDate).set 'date', 1
		else
			moment(lprops.timeperiod.toDate).set 'date', 1

	_hideNextMonth: ->
		# if (not @props.timeperiod.toDate? and not @props.timeperiod.fromDate?) # Empty period
		# 	return false
		lastOfMonth = moment(@state.firstDate).endOf 'month'
		if @props.isFromMonth and not @isEmptyPeriod()
			return true unless @props.timeperiod.toDate?
			@props.timeperiod.toDate?.isBefore lastOfMonth
		else #isSingleMonth, isEmptyMonth or toMonth
			@props.lastSelectableDate?.isBefore(lastOfMonth) or false

	_hidePreviousMonth: ->
		firstOfMonth = @state.firstDate
		if @props.isFromMonth or @props.isSingleMonth or @isEmptyPeriod()
			@props.firstSelectableDate?.isAfter(firstOfMonth) or
			@props.firstSelectableDate?.isSame(firstOfMonth) or false
		else
			return true unless @props.timeperiod.fromDate?
			@props.timeperiod.fromDate.isAfter(firstOfMonth)  or \
			@props.timeperiod.fromDate.isSame firstOfMonth, 'day'

	isEmptyPeriod: (props) ->
		lprops = props or @props
		(not lprops.timeperiod.toDate? and not lprops.timeperiod.fromDate?)

	# Event handlers
	onNextMonthClicked: ->
		unless @_hideNextMonth()
			@setState
				firstDate: moment(@state.firstDate).add 1, 'months'

	onPreviousMonthClicked: ->
		unless @_hidePreviousMonth()
			@setState
				firstDate: moment(@state.firstDate).subtract 1, 'months'

	onDateSelected: (e) ->
		@props.onDateSelected e.currentTarget.dataset.formattedDate

	onMonthTitleClicked: ->
		@setState
			firstDate: @_getSelectedDate().startOf('month')
