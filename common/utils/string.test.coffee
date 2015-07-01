s = require './string'

describe 'string getSpaceString', ->
	it 'returns spaces', ->
		s.getSpaceString(1).should.equal String.fromCharCode(160)
