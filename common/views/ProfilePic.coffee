
classNames = require 'classnames'
Style = require '../styles/generated/props'
StringUtils = require '../utils/string'

{svg, path, circle, g, div, ellipse} = require 'react-coffee-elements'

module.exports = React.createClass

	displayName: 'ProfilePic'

	getDefaultProps: ->
		width: Style.baseSpacingUnit
		height: Style.baseSpacingUnit
		str: 'bla bla bla'
		colors: _.filter Style, (val, key) -> key.indexOf('Base') > 0

	render: ->
		hashCode = @hashCode @props.str
		console.log hashCode
		ratio = 0.8
		offsetX = 10
		offsetY = 65
		div
			style:
				width: "100px"
				height: "100px"
		,
				svg
					className: 'profile-pic'
					viewBox: '0 0 100 100'
					preserveAspectRatio: 'xMinYMin meet'
					ref: 'linechart'
					style: backgroundColor: @getRandomRgba 0.3
				,
					_.map [0..1], (i) =>
						[
							circle
								className: 'profile-pic__eye profile-pic__eye--left'
								cx: @random 3, 30, 1, 1
								cy: @random 3, 30, 1, 2
								r: @random 9, 6
								key: 'eye1' + i
								fill: @getRandomRgba 0.7
							circle
								className: 'profile-pic__eye profile-pic__eye--right'
								cx: @random 3, 70, 1, 3
								cy: @random 3, 30, 1, 4
								r: @random 9, 6
								key: 'eyey' + i
								fill: @getRandomRgba 0.7
							ellipse
								className: 'profile-pic__mouth'
								cx: @random 10, 55, 1
								cy: @random 10, 75, 1
								rx: @random 10, 30
								ry: @random 5, 5
								key: 'mouth' + i
								fill: @getRandomRgba 0.7
						]

	getRandomRgba: (a) ->
		"rgba(#{@hexToRgb _.sample @props.colors},#{a})"

	hashCode: (str) ->
		hash = 0
		if str.length == 0
			return hash
		i = 0
		while i < str.length
			char = str.charCodeAt(i)
			hash = (hash << 5) - hash + char
			hash = hash & hash
			i++
		hash

	random: (base = 1, offset = 0, neg = 0) -> base * (Math.random() - neg) + offset

	hexToRgb: (hex) ->
		result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec hex

		rgb =
			r: parseInt result[1], 16
			g: parseInt result[2], 16
			b: parseInt result[3], 16
		_.reduce rgb, (thing, thong) ->
			# console.log 'thing, thong', rgb, thing, thong
			"#{thing}, #{thong}"
