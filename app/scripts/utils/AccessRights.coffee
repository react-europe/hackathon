module.exports =
	check: (name, props) -> # Returns true if the seting is enabled
		# Update rights not implemented yet
		setting = _.find props.auth?.config?.access, (accessRight) -> accessRight.identifier is name
		if name is 'webpunch_qmail' # qmail works the opposite way from all other settings. Of course...
			setting? # If the setting exists it should be shown
		else
			not (setting? and setting.value? and setting.value is '0')
