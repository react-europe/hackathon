{ PureRenderMixin } = require('react/addons').addons

Button = React.createFactory require './btn'


module.exports = React.createClass

	mixins: [PureRenderMixin]

	displayName: 'SubmitButton'

	propTypes:
		loading: React.PropTypes.bool

	render: ->
		Button @props,
			@props.children
			React.createElement 'input',
				className: 'visuallyhidden'
				type: 'submit'
				onSubmit: (e) ->
					e.preventDefualt()
					@onClick(e)

	onClick: (e) ->
		@props.onClick(e) unless @props.loading
