Icon = React.createFactory require 'qcommon/views/icon'
GroupDetailsModal = React.createFactory require './GroupDetailsModalView'
Btn = React.createFactory require 'qcommon/views/btn'
Mixin = require '../../common/ApplicationViewMixin'

{ div, span, ul, li, a, h5 } = require 'elements'

module.exports = React.createClass

	displayName: 'SortingSelector'

	mixins: [ Mixin ]

	actions:
		setSorting: app.paths.actions.data.sorting.set

	getDefaultProps: ->
		sortOptions:
			name: 'Name'
			rating: 'Rating'
			distance: 'Distance'
			members: 'Members'

	getInitialState: -> details: false

	render: ->
		{ sorting } = @props
		div {className: 'sorting-selector'},
			h5 className: 'sorting-selector__heading', 'Sorting'
			div {className: 'btn-group'},
				_.map @props.sortOptions, (val, key) =>
					Btn
						className: 'btn--s'
						key: val
						modifiers: ['quiet']
						selected: key is sorting
						dataset: opt: key
						onClick: @onClick
					, val


	onClick: (e) ->
		opt = e.currentTarget.dataset.opt
		@actions.setSorting opt
