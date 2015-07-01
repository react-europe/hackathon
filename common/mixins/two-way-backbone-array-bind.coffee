
# Usage:
# To bind against @prop.component.get('variables'), an array containing variableIds
# r.input { type: 'checkbox', checkedLink: @bindIsArrayValuePresent(@props.component, 'variables', variableId) }
module.exports = bindIsArrayValuePresent: (model, array, arrayValue) ->
	value: _.contains model.get(array), arrayValue
	requestChange: (newValue) ->
		if newValue is true
			model.get(array).push(arrayValue)
			model.trigger 'change'
		else if newValue is false
			model.set array, _.without model.get(array), arrayValue
		else
			throw new Error('bindIsArrayValuePresent got a requestChange to value: ', newValue)
