
app = require './Application'

TranslationMixin = require '../mixins/TranslationMixin'
ApplicationViewMixin = require '../common/ApplicationViewMixin'
Req = require '../models/Req'
Modal = React.createFactory require 'qcommon/views/modal/modal'
Button = React.createFactory require 'qcommon/views/btn'

{ div, h3 } = require 'elements'

module.exports = React.createClass

	displayName:  'ModalBaseView'

	mixins: [ TranslationMixin, ApplicationViewMixin ]

	# ----------------------------------------------------------------------------------------------------------
	# DEPENDENCIES
	# ----------------------------------------------------------------------------------------------------------

	render: ->
		if obj?
			Modal {},
				h3 className: 'center bottom-margin', obj.title

				div {className: 'submit-buttons no-margin'},
					if 'error' in obj.sections
						[
							div className: 'submit-buttons__right', key: 'right', String.fromCharCode 160
							Button
								modifiers: ['quiet']
								className: 'submit-buttons__left'
								onClick: @onCancel
								key: 'closebutton'
							,
								@t 'Close'
						]
					else
						[
							div className: 'submit-buttons__right', key: 'rightcontainer'
							Button
								modifiers: ['quiet']
								key: 'cancelbutton'
								className: 'submit-buttons__left'
								onClick: @onCancel
							,
								@t 'Cancel'
						]

		else
			null
