
{getRoot} = require './api'
{startsWith} = require './string'
{baseSpacingUnit} = require '../styles/generated/props'

getImageSize = (base = 80) ->
	pixelRatio = window?.devicePixelRatio or 1
	size = base * Math.round pixelRatio

getImageUrl = (url, size) ->
	# The url we get also includes "/api", hence the substr
	size = size or getImageSize baseSpacingUnit * 4
	if url and not startsWith '/img/no_picture', url
		"#{getRoot()}/#{url.slice(1,url.length - 4)}_#{size}x#{size}#{url.slice(url.length - 4)}"

module.exports = {getImageUrl, getImageSize}
