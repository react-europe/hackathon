accessRights = require './access-rights'

define 'access rights method', ->
	define 'isMemberOf', ->
		it 'should return true when 1 is sent', ->
			accessRights.isMemberOf(1).should.equal true

		it 'should return true when 3 is sent', ->
			accessRights.isMemberOf(3).should.equal true

		it 'should return false when 4 is sent', ->
			accessRights.isMemberOf(4).should.equal false

	define 'canCreate', ->
		it 'should return true when 2 is sent', ->
			accessRights.canCreate(2).should.equal true

		it 'should return true when 3 is sent', ->
			accessRights.canCreate(3).should.equal true

		it 'should return false when 4 is sent', ->
			accessRights.canCreate(4).should.equal false

	define 'canRead', ->
		it 'should return true when 4 is sent', ->
			accessRights.canRead(4).should.equal true

		it 'should return true when 5 is sent', ->
			accessRights.canRead(5).should.equal true

		it 'should return false when 8 is sent', ->
			accessRights.canRead(8).should.equal false

	define 'canUpdate', ->
		it 'should return true when 8 is sent', ->
			accessRights.canUpdate(8).should.equal true

		it 'should return true when 12 is sent', ->
			accessRights.canUpdate(12).should.equal true

		it 'should return false when 16 is sent', ->
			accessRights.canUpdate(16).should.equal false

	define 'canDelete', ->
		it 'should return true when 16 is sent', ->
			accessRights.canDelete(16).should.equal true

		it 'should return true when 24 is sent', ->
			accessRights.canDelete(24).should.equal true

		it 'should return false when 12 is sent', ->
			accessRights.canDelete(12).should.equal false
