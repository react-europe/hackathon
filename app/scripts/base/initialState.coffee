# This is the initial state that gets loaded in to the global application state, see Application.coffee. If you want to
# play around with the state for debugging/development purposes, you're probably looking for devData.coffee.

initialState =
	api: {}
	auth: {}
	groups: {}
	sorting: 'name'
	filterString: null
	login:
		email: undefined
		password: undefined
		timezone: undefined
	logout:
		email: undefined
		password: undefined

module.exports = initialState
