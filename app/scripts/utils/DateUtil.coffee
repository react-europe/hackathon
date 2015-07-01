Moment = require 'moment'

module.exports =

	getDateString: (date, format =  'YYYY-MM-DD hh:mm:ss') ->
		extra = if format.indexOf('hh:mm') > -1 then ' HH:MM' else ''
		date = Moment(date, format)
		if date.isSame (new Date()), 'day'
			'Today'
		else
			date.calendar('ll')
