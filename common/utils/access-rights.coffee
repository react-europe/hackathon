
module.exports = AccessRights =
	#M CRUD, M=1, C=2, R=4, U=8, D=16
	crudList:
		[
			{'label':'Have users/groups', 'value': 1}
			{'label':'Create', 'value': 2}
			{'label':'Read', 'value': 4}
			{'label':'Update', 'value': 8}
			{'label':'Delete', 'value': 16}
		]

	isMemberOf: (number) -> (number & 1) is 1

	canCreate: (number) -> (number & 2) is 2

	canRead: (number) -> (number & 4) is 4

	canUpdate: (number) -> (number & 8) is 8

	canDelete: (number) -> (number & 16) is 16
