
module.exports =

	create: (test, message) ->
		_test: test
		_message: message

	validate: (validator, value) -> _validate validator, value

	validateAll: (validators, value) ->
		validators.reduce (acc, validator) ->
			if acc then return acc
			_validate validator, value
		,
			false

_validate = (validator, value) ->	if not validator._test value then validator._message else ''
