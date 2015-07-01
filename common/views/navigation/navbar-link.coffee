
Link = React.createFactory require('react-router').Link
classNames = require 'classnames'

Breakpoints = require '../../mixins/breakpoints'

Icon = React.createFactory require '../icon'

{ span } = require 'elements'

module.exports = React.createClass

	displayName: 'NavbarLink'

	mixins: [ Breakpoints ]

	propTypes:
		to: React.PropTypes.string.isRequired
		selected: React.PropTypes.bool
		onClick: React.PropTypes.func
		external: React.PropTypes.bool

	getDefaultProps: ->
		selected: false
		external: false

	render: ->
		if @props.external then @_renderExternalLink() else @_renderInternalLink()

	_getClasses: ->
		classes =
			'nav__link': true
			'tooltip--left tooltip--big': @screenWidth 'm'
			'link--active': @props.selected
		classes["nav__link--#{@props.to}"] = true
		classNames classes

	_renderInternalLink: ->
		Link
			className: @_getClasses()
			to: @props.to
			onClick: @props.onClick
			'data-tooltip': if @screenWidth('m') then @props.title
		,
			@getChildren()

	_renderExternalLink: ->
		React.createElement 'a',
			className: @_getClasses()
			href: "/#{@props.to}/"
			onClick: @props.onClick
			'data-tooltip': @props.title
		,
			@getChildren()

	getChildren: ->
		[
			Icon
				name: @props.id
				key: 'icon'
				className: "icon--l icon--right-padded icon-#{@props.id}"
			if @screenWidth 'xs','m'
				span key: 'title', @props.title
		]
