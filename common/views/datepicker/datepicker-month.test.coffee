React = require 'react/addons'
moment = require 'moment'

DatepickerMonth =  React.createFactory require './datepicker-month'

describe 'toMonth', ->
	before (done) ->
		timeperiod =
			fromDate: moment '2015-05-01', 'YYYY-MM-DD'
			toDate: moment '2015-07-01', 'YYYY-MM-DD'
		React.render DatepickerMonth(
			timeperiod: timeperiod
			isFromMonth: false
			lastSelectableDate: moment '2015-07-10', 'YYYY-MM-DD'
			onDateSelected: -> null
		)
		, document.body
		done()
	it 'should render the correct title', ->
		document.querySelectorAll('[data-test="datepicker-month__selected-date-title"]')[0]
			.innerHTML
			.should.equal 'July 1st'
	it 'should render the correct last selected date', ->
		document.querySelectorAll('.datepicker__date--selected-last')[0]
			.dataset.formattedDate
			.should.equal '2015-07-01'
	it 'should render the first date (May 28) as selected', ->
		document.querySelectorAll('.datepicker__date--selected')[0]
			.dataset.formattedDate
			.should.equal '2015-06-28'
	it 'should render dates after the last selectable as disabled', ->
		document.querySelectorAll('.datepicker__date--disabled')[0]
			.dataset.formattedDate
			.should.equal '2015-07-11'
describe 'fromMonth', ->
	before (done) ->
		timeperiod =
			fromDate: moment '2015-05-04', 'YYYY-MM-DD'
			toDate: moment '2015-08-09', 'YYYY-MM-DD'
		React.render DatepickerMonth(
			timeperiod: timeperiod
			isFromMonth: true
			lastSelectableDate: moment '2015-07-10', 'YYYY-MM-DD'
			onDateSelected: -> null
		)
		, document.body
		done()
	it 'should render the correct title', ->
		document.querySelectorAll('[data-test="datepicker-month__selected-date-title"]')[0]
			.innerHTML
			.should.equal 'May 4th'
	it 'should render the correct last selected date', ->
		document.querySelectorAll('.datepicker__date')[0]
			.dataset.formattedDate
			.should.equal '2015-04-26'
	it 'should render the first date (May 28) as not selected', ->
		allSelected = document.querySelectorAll('.datepicker__date--selected')
		allSelected[allSelected.length - 1]
			.dataset.formattedDate
			.should.equal '2015-06-06'
	it 'should render dates after the last selectable as disabled', ->
		document.querySelectorAll('.datepicker__date--disabled')
			.length.should.equal 0

describe 'singleMonth', ->
	before (done) ->
		timeperiod =
			fromDate: moment '2015-05-04', 'YYYY-MM-DD'
			toDate: moment '2015-05-04', 'YYYY-MM-DD'
		React.render DatepickerMonth(
			timeperiod: timeperiod
			isSingleMonth: true
			lastSelectableDate: moment '2015-05-10', 'YYYY-MM-DD'
			onDateSelected: -> null
		)
		, document.body
		done()
	it 'should not render prev btn as disabled', ->
		document.querySelectorAll('.datepicker__previous--disabled')
			.length
			.should.equal 0
	it 'should render next btn as disabled', ->
		document.querySelectorAll('.datepicker__next--disabled')
			.length
			.should.equal 1
	it 'should render next btn as disabled', ->
		document.querySelectorAll('.datepicker__date--disabled[data-formatted-date="2015-05-12"]')
			.length
			.should.equal 1
describe 'singleMonth with first date as first selectable and last date as last selectable', ->
	before (done) ->
		timeperiod =
			fromDate: moment '2015-05-04', 'YYYY-MM-DD'
			toDate: moment '2015-05-04', 'YYYY-MM-DD'
		React.render DatepickerMonth(
			timeperiod: timeperiod
			isSingleMonth: true
			firstSelectableDate: moment '2015-05-01', 'YYYY-MM-DD'
			lastSelectableDate: moment '2015-05-31', 'YYYY-MM-DD'
			onDateSelected: -> null
		)
		, document.body
		done()
	it 'should render prev btn as disabled', ->
		document.querySelectorAll('.datepicker__previous--disabled')
			.length
			.should.equal 1
	it 'should render next btn as disabled', ->
		document.querySelectorAll('.datepicker__next--disabled')
			.length
			.should.equal 1
describe 'date range with no date selected, fromMonth', ->
	before (done) ->
		timeperiod = {}
		React.render DatepickerMonth(
			timeperiod: timeperiod
			isFromMonth: true
			onDateSelected: -> null
		)
		, document.body
		done()
	it 'should render prev btn as enabled', ->
		document.querySelectorAll('.datepicker__previous--disabled')
			.length
			.should.equal 0
	it 'should render next btn as enabled', ->
		document.querySelectorAll('.datepicker__next--disabled')
			.length
			.should.equal 0

describe 'date range with no date selected, toMonth', ->
	before (done) ->
		timeperiod = {}
		React.render DatepickerMonth(
			timeperiod: timeperiod
			isFromMonth: false
			onDateSelected: -> null
		)
		, document.body
		done()
	it 'should render prev btn as enabled', ->
		document.querySelectorAll('.datepicker__previous--disabled')
			.length
			.should.equal 0
	it 'should render next btn as enabled', ->
		document.querySelectorAll('.datepicker__next--disabled')
			.length
			.should.equal 0

describe 'date range with no date selected and firstSelectableDate, fromMonth', ->
	before (done) ->
		timeperiod = {}
		React.render DatepickerMonth(
			timeperiod: timeperiod
			isFromMonth: true
			firstSelectableDate: moment().startOf 'day'
			onDateSelected: -> null
		)
		, document.body
		done()
	it 'should render prev btn as enabled', ->
		document.querySelectorAll('.datepicker__previous--disabled')
			.length
			.should.equal 1
	it 'should render next btn as enabled', ->
		document.querySelectorAll('.datepicker__next--disabled')
			.length
			.should.equal 0
describe 'date range with no date selected and firstSelectableDate, fromMonth', ->
	before (done) ->
		timeperiod = {}
		React.render DatepickerMonth(
			timeperiod: timeperiod
			isFromMonth: false
			lastSelectableDate: moment().startOf 'day'
			onDateSelected: -> null
		)
		, document.body
		done()
	it 'should render prev btn as enabled', ->
		document.querySelectorAll('.datepicker__previous--disabled')
			.length
			.should.equal 0
	it 'should render next btn as enabled', ->
		document.querySelectorAll('.datepicker__next--disabled')
			.length
			.should.equal 1
