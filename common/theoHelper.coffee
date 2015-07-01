_ = require 'lodash'
exports.get = (gulp) ->
	theo = require 'theo'
	props = './common/styles/properties/props.json'
	dest = './common/styles/generated'

	theo.registerFormat 'js', (json, options) ->
		json = filterBreakpointsForJS json, options
		map = _.map json.propKeys, (key, index) ->
			item = json.props[key]
			key = "#{_.camelCase key}"
			"	\"#{key}\": #{item.value},"
		.join '\n'
		"module.exports = {\n#{map}\n}"

	theo.registerValueTransform('scss/easing',
		(prop, meta) -> prop.type is 'easing',
		(prop, meta) ->
			[a,b,c,d] = prop.value
			"cubic-bezier(#{a}, #{b}, #{c}, #{d})"
	)
	theo.registerValueTransform('scss/duration',
		(prop, meta) -> prop.type is 'duration',
		(prop, meta) -> prop.value + 's'
	)
	theo.registerValueTransform('scss/size',
		(prop, meta) -> prop.type is 'size',
		(prop, meta) -> prop.value + 'px'
	)
	theo.registerValueTransform('js/string',
		(prop, meta) -> not (prop.type in ['easing', 'size', 'duration', 'font-weight']),
		(prop, meta) -> "\"#{prop.value}\""
	)
	theo.registerValueTransform('js/easing',
		(prop, meta) -> prop.type is 'easing',
		(prop, meta) -> "[#{prop.value}]"
	)
	theo.registerValueTransform('js/duration',
		(prop, meta) -> prop.type is 'duration',
		(prop, meta) -> prop.value * 1000
	)

	theo.registerTransform 'ownJs', [
		'js/string'
		'js/easing'
		'js/duration'
	]

	theo.registerTransform 'ownWeb', [
		'color/rgb'
		'scss/easing'
		'scss/size'
		'scss/duration'
	]

	return {
		theo
		props
		dest
	}

filterBreakpointsForJS = (json, options) ->
	# Not excluding the original values. Just adding the ones in the category to a new value.
	categoryProps = _.filter json.props, (item, key) ->
		item.category is 'breakpoint'
	.map (item) ->
		key = item.name.split('-start')[0]
		name: key
		value: item.value

	json.propKeys = json.propKeys.concat 'breakpoints'
	json.props['breakpoints'] = {value: JSON.stringify categoryProps}
	json
