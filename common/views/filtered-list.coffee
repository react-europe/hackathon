
{ Navigation } = require 'react-router'
classNames = require 'classnames'

ArrowsNavigation = require '../mixins/arrows-navigation'
Filtered = require '../mixins/filtered'
translate = require '../utils/translate'

List = React.createFactory require './list'
WrappedLink = React.createFactory require './wrapped-link'

{ div } = require 'elements'

module.exports = React.createClass

	displayName: 'FilteredList'

	propTypes:
		items: React.PropTypes.oneOfType [
			React.PropTypes.object
			React.PropTypes.array
		]
		itemsType: React.PropTypes.string.isRequired
		linkbaseurl: React.PropTypes.string.isRequired
		trackEvent: React.PropTypes.object
		getListItem: React.PropTypes.func
		getName: React.PropTypes.func

	mixins: [Filtered, ArrowsNavigation, Navigation]

	getDefaultProps: ->
		getListItem: @defaultGetListItem
		item_threshold: 20

	componentDidMount: ->
		if @props.items.length > @props.item_threshold then @setNavigationOn({onClickEnter: @onClickSelection, objectToListen: @getDOMNode()})

	componentWillUpdate: (nextprops, nextstate) ->
		@setNavigationOptions({itemsList: @filterList(nextprops.items, nextprops.getName), onClickEnter: @onClickSelection})

	render: ->
		items = @props.items
		itemsFiltered = @filterList items, @props.getName
		activeItemId = @getActiveItemid()

		div {className: 'search-list__wrapper'},
			if @props.items.length > @props.item_threshold then @getSearchBox({onClear: @onClearFilter, onChange: @onChangeFilter, placeholder: translate 'Search'})
			List {className: "select-list search-list select-list--arrow-nav #{@props.className}", ref: 'container', empty: translate "No #{@props.itemsType} found"},
				_.map itemsFiltered, (item) =>
					@props.getListItem item, activeItemId

	defaultGetListItem: (item, activeItemId) ->
		itemId = item.get 'id'
		linkOptions = {}
		linkOptions[@props.itemsType] = itemId
		isActive = if activeItemId is itemId then true else false
		listItemClasses = {
			'selected': @props.items.isSelectedId itemId
			'js-close-popup': true
			'item-hover': isActive
		}
		selectLinkClasses =
			'select-list__link': true

		WrappedLink
			key: "#{@props.itemsType}-#{itemId}"
			ref: if isActive then 'active'
			link: linkOptions
			query: @props.query
			trackEvent: @props.trackEvent
			className: classNames listItemClasses
		, item.get 'name'

	onClickSelection: (itemId) ->
		if itemId > -1
			options = {}
			options[@props.itemsType] = itemId
			@transitionTo @props.linkbaseurl, _.assign({}, @getParams(), options), @getQuery()

	onClearFilter: ->
		@clearActiveItem()

	onChangeFilter: ->
		if @isSearchClear()
			@onClearFilter()
		else @checkActiveItem()
