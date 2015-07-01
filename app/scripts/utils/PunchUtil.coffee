moment = require 'moment'

# TODO THis needs to be re-written and properly tested!!!

module.exports =

	getPercentages: (shift) ->
		# TODO Improve to handle overtime etc.

		shiftStart = moment(shift.start, 'HH:mm')
		shiftEnd = moment(shift.end, 'HH:mm')
		if shiftEnd.isBefore(shiftStart) then shiftEnd.add(1, 'day')

		shiftDuration = shiftEnd.diff shiftStart

		totalPunchTimes = getTotalPunchTimes shift.punches
		# if shift.id is '45457134'
		# 	console.log totalPunchTimes

		if totalPunchTimes?.start?

			totalStart = if shiftStart.isBefore totalPunchTimes.start then shiftStart else totalPunchTimes.start
			totalEnd = if shiftEnd.isAfter totalPunchTimes.end then shiftEnd else totalPunchTimes.end
			totalDuration = totalEnd.diff totalStart

			shiftDuration = shiftEnd.diff shiftStart
			shiftStartDiff = shiftStart.diff totalStart
			# if shift.id is '45457134'
			# 	# console.log totalStart.format(), totalEnd.format(), totalDuration / (1000 * 60 * 60)
			# 	console.log totalPunchTimes
			# 	console.log totalStart.format('HH:mm'), shiftStart.format('HH:mm'), 100 * shiftStartDiff / totalDuration

			return {
				shift:
					duration: 100 * shiftDuration / totalDuration
					start: 100 * shiftStartDiff / totalDuration
				punches: getPunchPercentages shift.punches, {start: totalStart, duration: totalDuration}, shift
			}
		else
			return {
				shift:
					duration: 100
					start: 0
				punch:
					duration: 0
					start: 0
			}

getTotalPunchTimes = (punches) ->
	return null unless punches
	totalPunchTimes = {}
	for punch in punches
		punchStart = moment(punch.start, 'HH:mm')
		punchEnd = if punch.end? and not punch.isOpen then moment(punch.end, 'HH:mm') else moment()
		if punchEnd.isBefore(punchStart) then punchEnd.add(1, 'day')

		if not totalPunchTimes.start? or totalPunchTimes.start?.isAfter punchStart
			totalPunchTimes.start = punchStart
		if not totalPunchTimes.end? or totalPunchTimes.end?.isBefore punchEnd
			totalPunchTimes.end = punchEnd
	totalPunchTimes

getPunchPercentages = (punches, totalTimes, shift) ->
	return null unless punches
	_.map punches, (punch) ->
		punchStart = moment(punch.start, 'HH:mm')
		punchEnd = if punch.end? and not punch.isOpen then moment(punch.end, 'HH:mm') else moment()
		if punchEnd.isBefore(punchStart) then punchEnd.add(1, 'day')
		startDiff = punchStart.diff totalTimes.start
		duration = punchEnd.diff punchStart

		# if shift.id is '45457134'
		# 	# console.log totalStart.format(), totalEnd.format(), totalDuration / (1000 * 60 * 60)
		# 	console.log totalTimes.start.format('HH:mm'), punchStart.format('HH:mm'), startDiff, punchEnd.format('HH:mm'), punch.end

		duration: 100 * duration / totalTimes.duration
		start: 100 * startDiff / totalTimes.duration


