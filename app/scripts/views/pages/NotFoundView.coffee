
TagInitializer = require 'qcommon/mixins/tag-initializer'

module.exports = React.createClass

	displayName: 'NotFoundView'

	mixins: [TagInitializer]

	render: ->
		@div {className: 'app__main-content'},
			@div {className: 'main-content__center gw'},
				@h2 '404 - This is probably not the page you are looking for'
