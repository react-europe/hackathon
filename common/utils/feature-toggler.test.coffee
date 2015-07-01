FeatureToggler = require './feature-toggler'

describe 'initialize should return feature classes', ->
	it 'returns class names with the right format', ->
		featureClasses = FeatureToggler.initialize()
		if featureClasses.length
			featureClasses[0].should.match /^ff-/
