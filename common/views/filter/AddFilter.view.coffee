
# require './filter.scss'

Filtered = require '../../mixins/filtered'

{ div, h5, span, ul, li } = require 'elements'

module.exports = React.createClass

	displayName: 'FilterSection'

	mixins: [ Filtered ]

	propTypes: ->
		filterList: React.PropTypes.array.isRequired
		activeFilterList: React.PropTypes.array.isRequired
		addFilter: React.PropTypes.func.isRequired
		placeholder: React.PropTypes.string.isRequired
		label: React.PropTypes.string.isRequired

	getDefaultProps: ->
		addFilterLabel: 'Add filter'

	getInitialState: ->
		showAddFilter: false

	render: ->
		div className: 'filter__add',
			h5 className: 'filter__add-title', @props.label
			if @getSelectableList().length > 10 then @getSearchBox placeholder: @props.placeholder
			ul {className: "select-list filter__add-list #{if @getSelectableList().length > 10 and not @state.filterString? then 'select-list--indicate-more'}"},
				_.map @getSearchList(), (type) =>
					li key: type.id, onClick: @addFilter(type.id), className: 'wrapped-link',
						span className: 'wrapped-link__link', type.name

	toggleAddFilter: (e) ->
		@setState showAddFilter: !@state.showAddFilter

	getSelectableList: ->
		_.filter @props.filterList, (type) =>
			not (type.id in @props.activeFilterList)

	getSearchList: ->
		_.filter @getSelectableList(), (type) =>
			@filter type.name
		.slice 0, 10

	addFilter: (id) ->
		=>
			@props.addFilter id
