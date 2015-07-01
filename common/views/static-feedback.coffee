
SlideDownSlideUp = require '../mixins/slide-down-slide-up'

module.exports = React.createClass

	displayName: 'Feedback'

	mixins: [SlideDownSlideUp]

	propTypes:
		feedbackMessage: React.PropTypes.string.isRequired

	render: ->
		React.createElement 'span', {className: 'feedback-tooltip'}, @props.feedbackMessage
