


firstOpenPunch = (e) ->
	if ! e?.shifts? then return null
	return compose(head, filter(propEq('isOpen', true)), flatten, pluck('punches'), prop('shifts')) e

canPunchIn = (e) -> ! firstOpenPunch(e)



# ----------------------------------------------------------------------------------------------------------
# EXPOSURE
# ----------------------------------------------------------------------------------------------------------
Employee = {
	canPunchIn
	firstOpenPunch
}

module.exports = Employee
