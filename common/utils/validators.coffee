
module.exports =

	isRequired: (x) -> x.length > 0

	isEmail: (x) ->
		# http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(x)

	isAtLeast: (n) ->
		(x) -> x.length >= n
