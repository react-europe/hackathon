
# ----------------------------------------------------------------------------------------------------------
# GENERAL (for all requests)
# ----------------------------------------------------------------------------------------------------------
isWaiting = (req) -> return req?.state == 'waiting'
hasError = (req) -> return req?.state == 'error'


# ----------------------------------------------------------------------------------------------------------
# SPECIFIC
# ----------------------------------------------------------------------------------------------------------
getEmployee =
	hasErrorInvalidBadgeNo: (req) -> req?.state == 'error' && req.data?.err?.msg == 'INVALID_EMPLOYEE_ID'


punch =
	in:
		errors: toEnum
			TIMEPUNCH_MISSING_SHIFT: 1
			INVALID_SHIFT_ID: 1
			INVALID_EMPLOYEE_ID: 1
			TIMEPUNCH_IS_OPEN: 1
			TIMEPUNCH_TOO_EARLY_MISSING_COMMENT: 1
			TIMEPUNCH_TOO_EARLY_MISSING_COMMENT_WITH_IGNORE_OVERTIME: 1
			TIMEPUNCH_TOO_LATE_MISSING_REASON: 1
			TIMEPUNCH_TOO_LATE_MISSING_COMMENT: 1
			TIMEPUNCH_GENERATES_OVERTIME_MISSING_CHOICE: 1
			INVALID_SHIFT_TIMEPERIOD: 1
	out:
		errors: toEnum
			TIMEPUNCH_LEAVING_LATE_MISSING_COMMENT: 1
			TIMEPUNCH_LEAVING_LATE_MISSING_COMMENT_WITH_IGNORE_OVERTIME: 1
			TIMEPUNCH_LEAVING_EARLY_MISSING_REASON: 1
			TIMEPUNCH_LEAVING_EARLY_MISSING_COMMENT: 1
			TIMEPUNCH_GENERATES_OVERTIME_MISSING_CHOICE: 1
			PUNCH_ON_SAME_MINUTE: 1
			TIMEPUNCH_MISSING_SHIFT: 1

# ----------------------------------------------------------------------------------------------------------
# EXPOSURE
# ----------------------------------------------------------------------------------------------------------
Req =
	isWaiting: isWaiting
	hasError: hasError

	getEmployee: getEmployee

	punch: punch

# TODO: find better solution for this
window.Req = Req

module.exports = Req
