module.exports =
	showMissingShiftModal: (appState) ->
		punchIn = appState.ui.api.employee.id?.punchIn
		# console.log appState, punchIn, punchIn.state is 'error' and punchIn.data.msg is 'TIMEPUNCH_MISSING_SHIFT'
		punchIn.state is 'error' and punchIn.data.msg is 'TIMEPUNCH_MISSING_SHIFT'
