n = require './number'

describe 'Number util', ->
	describe 'format()', ->
		it 'should default to 3 decimals', ->
			n.format {value: 1234.5678}, {unit: null}
				.value.should.equal '1 234.568'

		it 'should add seperators to huge numbers', ->
			n.format {value: 12341231231.5678}, {unit: null}
				.value.should.equal '12 341 231 231.568'

		it 'should clear trailing zeroes', ->
			n.format {value: 1234.0}, {unit: null}
				.value.should.equal '1 234'

		it 'should handle unit in variable object', ->
			n.format {value: 1234.0}, {unit: 'knappar'}, false
				.value.should.equal '1 234 KNAPPAR'

		it 'should format custom unit with three decimals', ->
			n.format {value: 1234.1271}, 'bananas'
				.value.should.equal '1 234.127'

		it 'should format custom unit with three decimals', ->
			n.format {value: 1234.1271}, 'bananas', false
				.value.should.equal '1 234.127 BANANAS'

		it 'should format sek with no decimals', ->
			n.format {value: 1234.1271}, 'sek'
				.value.should.equal '1 234'

		it 'should format sek with no decimals not in compact mode', ->
			n.format {value: 1234.1271}, 'sek', false
				.value.should.equal '1 234 SEK'

		it 'should format percentage with maximum of one decimal', ->
			n.format {value: 90.03}, '%'
				.value.should.equal '90.0'

		it 'should format percentage with maximum of one decimal', ->
			n.format {value: 1.2345}, '%'
				.value.should.equal '1.2'

		it 'should format percentage', ->
			n.format {value: 100}, '%'
				.value.should.equal '100'

		it 'should format percentage not in compact mode', ->
			n.format {value: 50}, '%', false
				.value.should.equal '50 %'

		it 'should format hours', ->
			n.format {value: 60.123}, 'hours'
				.value.should.equal '60'

		it 'should format hours not in compact mode', ->
			n.format {value: 60.123}, 'hours', false
				.value.should.equal '60 hours'

	describe 'getFormattedString()', ->
		it 'should handle 4 digit numbers', ->
			n.getFormattedString 4000
				.should.equal '4 000'

		it 'should do nothing with 3 digit numbers', ->
			n.getFormattedString 400
				.should.equal '400'

		it 'should handle 5 digit numbers', ->
			n.getFormattedString 40000
				.should.equal '40 000'

		it 'should handle 6 digit numbers', ->
			n.getFormattedString 123456
				.should.equal '123 456'

		it 'should handle 7 digit numbers', ->
			n.getFormattedString 1234567
				.should.equal '1 234 567'

		it 'should handle 9 digit numbers', ->
			n.getFormattedString 123456789
				.should.equal '123 456 789'

		it 'should handle 10 digit numbers', ->
			n.getFormattedString 1234567890
				.should.equal '1 234 567 890'

		it 'should handle numbers with decimals', ->
			n.getFormattedString 40000.12345
				.should.equal '40 000'

	describe 'roundToMillion()', ->
		it 'should handle numbers lower than 1 million', ->
			n.roundToMillion 40000.12345
				.should.equal 0.04

		it 'should handle numbers lower than 1 million with more decimls', ->
			n.roundToMillion 41234.12345, 4
				.should.equal 0.0412

		it 'should handle numbers lower than 1 million with no decimls', ->
			n.roundToMillion 41234.12345, 0
				.should.equal 0

		it 'should handle numbers slightly lower than 1 million with no decimls', ->
			n.roundToMillion 791234, 0
				.should.equal 1

		it 'should handle numbers lower than 1 million', ->
			n.roundToMillion 41010101010000.12345
				.should.equal 41010101.01

		it 'should handle numbers lower than 1 million and no decimals', ->
			n.roundToMillion 41010101010000.12345, 0
				.should.equal 41010101

	describe 'roundToThousand()', ->
		it 'should handle numbers lower than 1 thousand', ->
			n.roundToThousand 40000.12345
				.should.equal 40

		it 'should handle numbers lower than 1 thousand with more decimls', ->
			n.roundToThousand 41234.12345, 4
				.should.equal 41.2341

		it 'should handle numbers lower than 1 thousand with no decimls', ->
			n.roundToThousand 41234.12345, 0
				.should.equal 41

		it 'should handle numbers slightly lower than 1 thousand with no decimls', ->
			n.roundToThousand 79923, 0
				.should.equal 80

		it 'should handle numbers lower than 1 thousand', ->
			n.roundToThousand 41010101010.12345
				.should.equal 41010101.01

		it 'should handle numbers lower than 1 thousand and no decimals', ->
			n.roundToThousand 41010101010000.12345, 0
				.should.equal 41010101010

	describe 'getEvenCeilNumber()', ->
		it 'should handle one digit numbers', ->
			n.getEvenCeilNumber 3
				.should.equal 3
			n.getEvenCeilNumber 8
				.should.equal 8
			n.getEvenCeilNumber 9
				.should.equal 9
		it 'should handle two digit numbers', ->
			n.getEvenCeilNumber 11
				.should.equal 15
			n.getEvenCeilNumber 17
				.should.equal 20
		it 'should round two digit numbers to nearest 5', ->
			n.getEvenCeilNumber 35
				.should.equal 35
			n.getEvenCeilNumber 43
				.should.equal 45
			n.getEvenCeilNumber 47
				.should.equal 50
			n.getEvenCeilNumber 62
				.should.equal 65
			n.getEvenCeilNumber 68
				.should.equal 70
			n.getEvenCeilNumber 99
				.should.equal 100
		it 'should round three digit numbers to nearest 25', ->
			n.getEvenCeilNumber 101
				.should.equal 125
			n.getEvenCeilNumber 119
				.should.equal 125
			n.getEvenCeilNumber 420
				.should.equal 425
			n.getEvenCeilNumber 444
				.should.equal 450
		it 'should round big three digit numbers to nearest 50', ->
			n.getEvenCeilNumber 501
				.should.equal 550
			n.getEvenCeilNumber 885
				.should.equal 900
		it 'should round four digit numbers to nearest 250 or 500', ->
			n.getEvenCeilNumber 2030
				.should.equal 2250
			n.getEvenCeilNumber 4436
				.should.equal 4500
			n.getEvenCeilNumber 4501
				.should.equal 4750
			n.getEvenCeilNumber 5002
				.should.equal 5500
		it 'should return 0 for negative numbers', ->
			n.getEvenCeilNumber -4501
				.should.equal 0
		it 'should handle floats', ->
			n.getEvenCeilNumber 175.5
				.should.equal 200

	describe 'getEvenFloorNumber()', ->
		it 'should handle one digit numbers', ->
			n.getEvenFloorNumber 3
				.should.equal 3
			n.getEvenFloorNumber 8
				.should.equal 8
			n.getEvenFloorNumber 9
				.should.equal 9
		it 'should handle two digit numbers', ->
			n.getEvenFloorNumber 11
				.should.equal 10
			n.getEvenFloorNumber 17
				.should.equal 15
		it 'should round two digit numbers to nearest 5', ->
			n.getEvenFloorNumber 35
				.should.equal 35
			n.getEvenFloorNumber 43
				.should.equal 40
			n.getEvenFloorNumber 47
				.should.equal 45
			n.getEvenFloorNumber 62
				.should.equal 60
			n.getEvenFloorNumber 68
				.should.equal 65
			n.getEvenFloorNumber 99
				.should.equal 95
		it 'should round three digit numbers to nearest 25', ->
			n.getEvenFloorNumber 101
				.should.equal 100
			n.getEvenFloorNumber 119
				.should.equal 100
			n.getEvenFloorNumber 420
				.should.equal 400
			n.getEvenFloorNumber 444
				.should.equal 425
		it 'should round big three digit numbers to nearest 50', ->
			n.getEvenFloorNumber 501
				.should.equal 500
			n.getEvenFloorNumber 885
				.should.equal850
		it 'should round four digit numbers to nearest 250 or 500', ->
			n.getEvenFloorNumber 2030
				.should.equal 2000
			n.getEvenFloorNumber 4436
				.should.equal 4250
			n.getEvenFloorNumber 4501
				.should.equal 4500
			n.getEvenFloorNumber 5002
				.should.equal 5000
		it 'should return 0 for negative numbers', ->
			n.getEvenFloorNumber -4501
				.should.equal 0
		it 'should handle floats', ->
			n.getEvenFloorNumber 174.5
				.should.equal 150
