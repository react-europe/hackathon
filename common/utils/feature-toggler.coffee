
config = require './config'

initialize = () ->
	featureClasses = getFeatures().map (flag) -> "ff-#{flag}"
	DOMTokenList::add.apply document.querySelector('html').classList, featureClasses
	return featureClasses

runWhen = (feature, alternatives) ->
	if isOn(feature) and alternatives.on?
		do alternatives.on
	else if alternatives.off?
		do alternatives.off

getFeatures = -> config.get('ff') or []

isOn = (feature) -> feature in getFeatures()

module.exports = {initialize, runWhen, isOn, getFeatures}
