{ State, Link } = require 'react-router'
Tracking = require '../utils/tracking'

module.exports = React.createClass

	displayName: 'InternalLink'

	propTypes:
		className: React.PropTypes.string.isRequired
		trackEvent: React.PropTypes.shape
			category: React.PropTypes.string
			action: React.PropTypes.string
		link: React.PropTypes.object
		onClick: React.PropTypes.func
		clearQuery: React.PropTypes.oneOfType [
			React.PropTypes.bool
			React.PropTypes.array
		]
		clearParams: React.PropTypes.oneOfType [
			React.PropTypes.bool
			React.PropTypes.array
		]
		tabIndex: React.PropTypes.number

	mixins: [State]

	cleanObject: (objectToClean, cleanParams) ->
		if cleanParams instanceof Array # Clear specified params
			for key in cleanParams
				if _.has objectToClean, key
					delete objectToClean[key]

		return objectToClean

	render: ->
		currentQuery = @getQuery()
		currentParams = @getParams()

		if @props.clearQuery is true
			currentQuery = {}
		else
			currentQuery = @cleanObject currentQuery, @props.clearQuery

		if @props.clearParams is true
			currentParams = {}
		else
			currentParams = @cleanObject currentParams, @props.clearParams

		query = _.assign {}, currentQuery, @props.link, @props.query
		params = _.assign {}, currentParams, @props.params

		props = {
			params
			query
			'data-touch-feedback': true
			to: @props.to or @getPathname()
			className: @props.className
			onClick: @onClick
			activeClassName: 'link--active'
		}

		if @props.tabIndex then _.assign props, {tabIndex: @props.tabIndex}

		React.createElement Link, props, @props.children

	onClick: (e) ->
		@props.onClick?()
