Tabletop = require 'Tabletop'
fp = require '../coffee/common/functionalBootstrap'

fp.exposeInNodeOn(global)

extractAction = (data, rule) ->
	extract = pipe	filter( where { breakdown1: 'Conditions', breakdown2: 'Actions' } ),
									find (x) -> x[rule] == 'T'
									prop 'breakdown3'
	return extract data

extractLoggedIn = (data, rule) ->
	extract = pipe	filter( where { breakdown3: 'NOT logged in' } ),
									find (x) -> x[rule] != 'T'
	return extract(data)?


extractRule = (data, ruleNumber) ->
	rule = 'r'+ruleNumber
	return {} = 
		action: extractAction data, rule
		loggedIn: extractLoggedIn data, rule


generateRulesFromTable = () ->
	Tabletop.init
		# key: '1VUAYTJI5SBYFpANFSIDaOkIfRtuDy68HI0qx8lGoxpo'
		key: '1rZm5NgEnIYkoZ7Y-MNX7D_W-il99geXKJTyqwiehdOA'
		callback: (data, tabletop) ->
			extractData = pipe 	prop('Sheet1'), # rules are nested in Sheet1.elements
													prop('elements'), 
													filter (x) -> x.breakdown1 != '.' # remove rows that exists for visual spacing
													map (x) -> # trim away comments
														x.breakdown1 = x.breakdown1.replace(/\(.*\)/, '').trim()
														x.breakdown2 = x.breakdown2.replace(/\(.*\)/, '').trim()
														x.breakdown3 = x.breakdown3.replace(/\(.*\)/, '').trim()
														return x
													reduce (acc, val) -> # if row has no breakdown, inherit breakdown from row above
														if ! val.breakdown1 then val.breakdown1 = acc[acc.length-1].breakdown1
														if ! val.breakdown2 then val.breakdown2 = acc[acc.length-1].breakdown2
														acc.concat val
													, []

			decisionTable = extractData data
			# decisionTable = _.chain(data)
			# 									.filter((x) -> x.breakdown1 != '.') # remove rows that are there for visual spacing
			# 									.each((x)-> # trim away comments
			# 												x.breakdown1 = x.breakdown1.replace(/\(.*\)/, '').trim()
			# 												x.breakdown2 = x.breakdown2.replace(/\(.*\)/, '').trim()
			# 												x.breakdown3 = x.breakdown3.replace(/\(.*\)/, '').trim())
												# .reduce(((mem, x) -> # if row has no breakdown specified, inherit breakdown from row above
												# 								if ! x.breakdown1 then x.breakdown1 = mem[mem.length-1].breakdown1
												# 								if ! x.breakdown2 then x.breakdown2 = mem[mem.length-1].breakdown2
												# 								mem.push(x)
												# 								mem), [])
												# .value()
			console.log decisionTable

			noOfRules = length(keys(decisionTable[0])) - 3 - 1
			ruleNumbers = range 1, noOfRules + 1

			rules = map ((x) -> extractRule decisionTable, x), ruleNumbers

			console.log rules
			# rules = extractRules decisionTable, null
			# console.log actions

generateRulesFromTable()

# extractAction = (data, rule) ->
# 	action = _.chain(data)
# 							.where
# 								breakdown1: 'Conditions'
# 								breakdown2: 'Actions'
# 							.find (x) -> x[rule] == 'T'
# 							.value()
# 	action.breakdown3

# zoneStringToTime = (zoneString) ->
# 	switch zoneString
# 		when "earlier than zone 1" then 141231201
# 		when "inside of zone 1" then 141231202
# 		when "exactly on shift start" then 141231203
# 		when "inside zone 2" then 141231204
# 		when "after zone 2" then 141231205
# 		when "inside zone 3" then 141231206
# 		when "exactly on shift end" then 141231207
# 		when "inside zone 4" then 141231208
# 		when "after zone 4" then 141231209

# extractPunchTime = (data, rule) ->
# 	action = _.chain(data)
# 							.where
# 								breakdown1: 'Conditions'
# 								breakdown2: 'Time of punch'
# 							.find (x) -> x[rule] == 'T'
# 							.value()
# 	zoneStringToTime(action.breakdown3)

# extractBadgeNo = (data, rule) ->
# 	conditions = _.where(data,
# 								breakdown1: 'Conditions'
# 								breakdown2: 'Agreement')
# 	binary = _.reduce(conditions, ((mem, x) -> mem += if x[rule] is 'T' then "1" else "0" ) , "")
# 	parseInt(binary, 2)

# extractRule = (data, ruleNumber) ->
# 	rule = 'r'+ruleNumber
# 	return {
# 		action: extractAction(data, rule)
# 		punchTime: extractPunchTime(data, rule)
# 		badgeNo: extractBadgeNo(data, rule)
# 	}
