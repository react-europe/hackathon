moment = require 'moment'

module.exports =

	getPropertyString: ({group, property}) ->
		switch property
			when 'created' then moment(group.created).format('MMM DD, YYYY')
			when 'distance' then "#{group.distance } km"
			else group[property]

