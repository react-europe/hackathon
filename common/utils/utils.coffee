
{whereEq, filter, curry, forEach, apply, evolve, mapObj, find, createMapEntry, keys, values, unionWith, propEq, compose} = require 'ramda' #auto_require:funp

mergeIntoTree = (entities, mapping, tree) ->
	if not entities then return
	entitiesEq = (x, y) -> x.id == y.id
	mergeFn = (key) -> {$apply: (existingEntities) -> unionWith entitiesEq, values(entities[key]), existingEntities}
	commands = mapObj mergeFn, mapping
	tree.update commands

setInTree = (entities, tree) ->
	mergeLists = (newEntities) -> {$set: values(newEntities)}
	commands = mapObj mergeLists, entities
	tree.update commands

install = (o, target) ->
	addKey = (k) -> target[k] = o[k]
	forEach addKey, keys o

liftFn = curry (propName, entityKey, entities, shift) ->
	evolve createMapEntry(propName, _whereIdFn(entities[entityKey])), shift

flatten = (array, key) ->
	array.reduce (acc, obj) ->
		acc.push obj
		acc.concat flatten obj[key], key
	,
		[]

findWhere = curry (prop, value, array = []) -> find propEq(prop, value), array

findWhereId = curry (value, array) -> findWhere 'id', +value, array

filterWhere = curry (prop, value, array = []) -> filter propEq(prop, value), array

filterWhereType = filterWhere 'type'

composeCall = (f..., data) -> compose(f...) data

_whereIdFn = (list) -> (id) -> if not list then null else find whereEq({id}), list

# http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
generateId = ->
	'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace /[xy]/g, (c) ->
		r = Math.random() * 16 | 0
		if c == 'x' then r.toString 16 else (r & 0x3 | 0x8).toString 16

module.exports = {
	mergeIntoTree,
	setInTree,
	install,
	liftFn,
	flatten,
	findWhere,
	findWhereId,
	filterWhere,
	filterWhereType,
	composeCall,
	generateId
}
