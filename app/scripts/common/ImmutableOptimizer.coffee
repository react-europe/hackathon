# The beatiful result of using immutable data structures is this file :)
# There are more advanced implementations of this on the internet but for now this seems enough for wp

ImmutableOptimizer =
	shouldComponentUpdate: (newProps, nextState) ->
		return true

		# TODO : rethink this after the ApplicationViewMixin concept has been tested

		# if nextState != @state then return true
		# refsChanged = ! all ((key) => @props[key] is newProps[key]), keys(@props)
		# return refsChanged

module.exports = ImmutableOptimizer
