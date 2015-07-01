classNames = require 'classnames'
{filter, map} = require 'ramda' #auto_require:ramda

{composeCall} = require '../utils/utils'
Feedback = React.createFactory require './feedback'

FormSection = React.createFactory require './form-section'
Button = React.createFactory require './btn'
Icon = React.createFactory require './icon'
Popup = React.createFactory require './popup'
Filtered = require '../mixins/filtered'

{ div, ul, li, span, h4 } = require 'elements'


module.exports = React.createClass

	displayName: 'SelectSection'

	mixins: [Filtered]

	propTypes:
		onSelected: React.PropTypes.func.isRequired
		name: React.PropTypes.string
		items: React.PropTypes.array
		title: React.PropTypes.string
		notSelectedLabel: React.PropTypes.string
		feedback: React.PropTypes.object
		selected: React.PropTypes.oneOfType [
				React.PropTypes.string
				React.PropTypes.number
			]
		tooMany: React.PropTypes.number
		clearOption: React.PropTypes.bool

	getDefaultProps: ->
		title: ''
		notSelectedLabel: 'Not selected'
		tooMany: 10
		whenFilteringIsNeeded: 20
		clearOption: false

	render: ->
		FormSection {title: @props.title, className: @props.className},
			if @props.items.length > @props.tooMany
				@_renderBigGroup()
			else
				@_renderNormalGroup()

			if @props.feedback?
				@props.feedback

	_renderNormalGroup: ->
		_.map @props.items, @_renderButton

	_renderBigGroup: ->
		{title, items, whenFilteringIsNeeded} = @props
		Popup
			popupClass: 'form-section__select-btn'
			linkContent: @_renderLinkContent()
			popupContent:
				if items.length > whenFilteringIsNeeded
					ul className: 'select-list',
						@getSearchBox {placeholder: 'Search for shifts'}
						@_renderFilteredList()
				else
					ul className: 'select-list',
						h4 className: 'center', title
						map @_renderLi, items

	_renderFilteredList: ->
		filterOnLabel = (x) => @filter x.label
		composeCall map(@_renderLi), filter(filterOnLabel), @props.items

	_renderLinkContent: ->
		{selected, items, clearOption} = @props

		selectedItem = if selected? then _.find items, (item) -> '' + selected is '' + item.id
		if selectedItem?.label?
			itemButton = Button(modifiers: ['normal'], selectedItem?.label)
			if clearOption
				div className: 'btn-group',
					itemButton
					Button modifiers: ['normal'], onClick: @onClear, Icon className: 'icon--s icon--action', name: 'x-s'
			else
				itemButton
		else
			@props.notSelectedLabel

	_renderLi: (item) ->
		classes = classNames
			'selected': @props.selected is item.id
			'js-close-popup wrapped-link': true
		li
			className: classes
			onClick: @onItemClicked
			key: item.id
			'data-name': @props.name
			'data-id': item.id
		, span className: 'wrapped-link__link', item.label

	_renderButton: (item) ->
		Button
			modifiers: ['pill', 'quiet']
			className: 'form-section__select-btn'
			selected: "#{@props.selected}" is "#{item.id}"
			onClick: @onItemClicked
			dataset:
				name: @props.name
				id: item.id
			key: item.id
		, item.label

	onClear: (e) ->
		e.stopPropagation()
		@props.onSelected @props.name, undefined

	onItemClicked: (event) ->
		data = event.currentTarget.dataset
		@props.onSelected data.name, data.id

