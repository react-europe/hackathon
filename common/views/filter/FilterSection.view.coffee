
# require './filter.scss'
{ PureRenderMixin } = require('react/addons').addons
Icon = React.createFactory require '../icon'
Button = React.createFactory require '../btn'
AddFilter = React.createFactory require './AddFilter'
AnimateContent = require '../../mixins/animate-content'

{ div, h5, span, ul, li } = require 'elements'

module.exports = React.createClass

	displayName: 'FilterSection'

	mixins: [ AnimateContent, PureRenderMixin ]

	propTypes: ->
		title: React.PropTypes.string.isRequired
		filterList: React.PropTypes.array.isRequired
		activeFilterList: React.PropTypes.array.isRequired
		addFilter: React.PropTypes.func.isRequired
		removeFilter: React.PropTypes.func.isRequired
		placeholderTitle: React.PropTypes.string
		addFilterLabel: React.PropTypes.string
		clearLabel: React.PropTypes.string

	getDefaultProps: ->
		addFilterLabel: 'Add filter'
		clearLabel: 'Clear'

	getInitialState: ->
		showAddFilter: false

	componentWillReceiveProps: (newProps) ->
		if newProps.activeFilterList isnt @props.activeFilterList and \
		newProps.activeFilterList.length > @props.activeFilterList.length

			@setState
				showAddFilter: false

	render: ->
		allFiltersSelected = @props.activeFilterList.length is @props.filterList.length
		div {className: 'filter', ref: 'animate', 'data-animate-show-content': true},
			div className: 'filter__title',
				h5 @props.title
				unless allFiltersSelected
					Button modifiers: ['s', 'round-icon', 'quiet'], onClick: @toggleAddFilter,
						Icon className: "icon--quiet-action icon--s icon--rotating#{if @state.showAddFilter then ' icon--rotating-45' else ''}", name: 'plus-s'
			div className: 'filter__body',
				if @state.showAddFilter
					AddFilter
						label: @props.addFilterLabel
						placeholder: @props.placeholderTitle or @props.title
						addFilter: @addActiveFilter
						activeFilterList: @props.activeFilterList
						filterList: @props.filterList
				if @getActiveFilters().length then @renderFilterBody()

	renderFilterBody: ->
		ul {className: 'select-list filter__selected-list'},
			_.map @getActiveFilters(), (type) =>
				li key: type.id,className: 'flex',
					span className: '', type.name
					span className: 'link small', onClick: @removeActiveFilter(type.id), @props.clearLabel

	toggleAddFilter: (e) ->
		@setState showAddFilter: !@state.showAddFilter

	addActiveFilter: (id) ->
		@props.addFilter id

	removeActiveFilter: (id) ->
		=>
			@props.removeFilter id

	getActiveFilters: ->
		_.filter @props.filterList, (type) =>
			type.id in @props.activeFilterList
