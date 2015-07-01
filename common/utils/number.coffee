
_roundTo = (num, power, decimals) ->
	firstDivider = Math.pow 10, power - decimals
	secondDivider = Math.pow 10, decimals
	num = Math.round(num / firstDivider) / secondDivider
	num

_format = (value, unit, compact = true) ->
	_unit = unit
	_unit = 'currency' if ['sek', 'usd'].indexOf(unit?.toLowerCase()) > -1

	switch
		when _unit is 'currency' then _formatCurrency value, unit, compact
		when _unit is 'hours' then _formatHours value, unit, compact
		when _unit is '%' then _formatPercentage value, unit, compact
		else _formatDefault value, unit, compact

_formatDefault = (value, unit, compact) ->
	number = parseFloat(value).toFixed 3
	rounded = value isnt 0 and value % number isnt 0
	string = _group if rounded then number else value
	string += ' ' + unit.toUpperCase() if not compact
	string

_formatPercentage = (value, unit, compact) ->
	number = parseFloat(value).toFixed 1
	rounded = value isnt 0 and value % number isnt 0
	string = _group if rounded then number else value
	string += ' ' + unit.toUpperCase() if not compact
	string

_formatCurrency = (value, unit, compact) ->
	number = parseFloat(value).toFixed 0
	string = _group number
	string += ' ' + unit.toUpperCase() if not compact
	string

_formatHours = (value, unit, compact) ->
	number = parseFloat(value).toFixed 0
	string = _group number, false
	string += ' ' + unit if not compact
	string

_group = (num) ->
	str = num.toString()
	str = str.split '.'
	str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1 ') if str[0].length >= 4
	str[1] = str[1].replace(/(\d{3})/g, '$1 ') if str[1] and str[1].length >= 4
	str.join '.'

_getEvenNumber = (number, func) ->
	if number <= 0 then return 0
	number = parseInt Math[func] number
	len = Math.ceil(Math.log(number + 1) / Math.LN10)
	power = Math.pow(10, len)
	round = 0.25 * Math.round number / power + 1
	step = Math.max (round * power / 10), (if len > 1 then 5 else 1)
	Math[func](number / step ) * step

NumberUtil = {
	getEvenCeilNumber: (number) ->
		_getEvenNumber number, 'ceil'

	getEvenFloorNumber: (number) ->
		_getEvenNumber number, 'floor'

	getFormattedString: (num, round = true) ->
		num = Math.round(num) if round
		_format(num, null)

	round: (num, decimals = 1) ->
		_roundTo num, 0, decimals

	roundToMillion: (num, decimals = 2) ->
		_roundTo num, 6, decimals

	roundToThousand: (num, decimals = 2) ->
		_roundTo num, 3, decimals

	format: (values, variable, compact = true) ->
		unit = variable
		unit = variable.unit if _.isPlainObject(variable) and 'unit' of variable
		if (_.isNumber(values) or _.isString(values)) and
		(_.isString(variable) or _.isUndefined(variable) or _.isNull(variable))
			return value: _format values, unit, compact

		string = {}

		if 'value' of values
			_.extend string,
				value: _format values.value, unit, compact

		if 'time' of values
			_.extend string,
				time: _format values.time, 'time', compact

		string
}

module.exports = NumberUtil
