
# INTRO TO FUNCTIONAL PROGRAMMING IN COFFEE SCRIPT
# ------------------------------------------------
# This file is responsible for bootstraping a good environment for functional programming in CoffeeScript.
# Lodash and underscore are good if you have some fp needs but if you want to write 80% of the app in an fp-
# way, they are kind of annoying, see: https://www.youtube.com/watch?v=m3svKOdZijA

# Since WP2 is a bit of an attempt to do "stuff" more functional and immutable, we rely mostly on
# the ramda library. If there are some functions missing in ramda, they can be added from lodash with
# flipped parameters! If they don't exist in lodash, they can be added manually in the extra object below.


Ra = require 'ramda'
lo = require 'lodash'


# best solution: ignore this file for jshint. Tried it with ignore:start and adding it to .jshintignore with out any luck
# predef: redef in funBoot and too many errors...
# globals as list: verkar ok i funBoot men andra filer säger 'map' is not defined

# adding Ramda functions to local scope so they can be used in "extra"-functions below
{isArrayLike,op,curryN,curry,flip,nAry,unary,binary,arity,invokerN,useWith,forEach,clone,cloneDeep,isEmpty,prepend,cons} = Ra
{prependTo,nth,head,car,last,tail,cdr,append,push,appendTo,concat,identity,I,argN,times,repeatN,apply,unapply,compose} = Ra
{pCompose,pipe,pPipe,lPartial,rPartial,memoize,once,wrap,constructN,construct,converge,reduce,foldl,reduceRight,foldr} = Ra
{unfoldr,map,mapObj,scanl,liftN,lift,ap,empty,chain,commuteMap,commute,size,filter,reject,takeWhile,take,skipUntil} = Ra
{skip,find,findIndex,findLast,findLastIndex,every,some,indexOf,lastIndexOf,contains,containsWith,uniq,isSet,uniqWith,pluck} = Ra
{flatten,unnest,zipWith,zip,zipObj,fromPairs,createMapEntry,lens,xprod,reverse,range,join,slice,remove,insert,comparator} = Ra
{sort,groupBy,partition,tap,eq,prop,get,propOf,props,propOr,has,hasIn,func,always,bind,keys,keysIn,toPairs,toPairsIn,values} = Ra
{valuesIn,pick,omit,pickBy,pickAll,mixin,cloneObj,eqProps,where,assoc,assocPath,installTo,type,alwaysZero,alwaysFalse} = Ra
{alwaysTrue,allPredicates,anyPredicates,ifElse,cond,add,multiply,subtract,divide,modulo,mathMod,sum,product} = Ra
{lt,lte,gt,gte,max,maxBy,min,minBy,substring,substringFrom,substringTo,charAt,charCodeAt,match,replace,strIndexOf} = Ra
{strLastIndexOf,trim,split,pathOn,path,pathEq,project,propEq,union,unionWith,difference,differenceWith} = Ra
{intersection,intersectionWith,sortBy,countBy,functions,functionsIn} = Ra


# TODO: kanske döpa om path till getpath eftersom path är ett så bra ord att använda i andra sammanhang

# Sometimes, what's in the libraries isn't enough, so in the extra object we can add more stuff.
# Note that non-pure functions are prefixed with a _  (inspired by clojures !-prefix)
extra =
	differenceFlipped: Ra.flip Ra.difference # just a flip of difference to be used in compositions
	dropLast: Ra.curry (n, xs) -> Ra.slice 0, xs.length - n, xs # dropLas is missing
	log: (args...) -> console.log args...
	stringify: JSON.stringify

isEmptyObject = lo.isEmpty # see https://github.com/ramda/ramda/pull/539
extra.isEmptyObject = isEmptyObject

isTrue = (x) -> !!x
extra.isTrue = isTrue
isFalse = (x) -> !x
extra.isFalse = isFalse

isA = Ra.is # add is as isA since is collides with Coffee's is
extra.isA = isA

merge = lo.merge
extra.merge = merge

extra.ensurePath_ = (path, obj) ->
	pointer = obj
	forEach (n) ->
		if ! has n, pointer then pointer[n] = {}
		pointer = pointer[n]
	, split('.', path)
	return obj

extra.setInPath_ = (path, value, obj) ->
	if value == undefined then throw new Error('value is undefined')
	pointer = obj
	names = split '.', path
	forEach (x) ->
		if ! has x, pointer then pointer[x] = {}
		pointer = pointer[x]
	, dropLast(1, names)

	pointer[last(names)] = value
	return obj

hasPath = (path, obj) ->
	pointer = obj
	ks = split '.', path
	return every (k) ->
		pointer = pointer[k]
		if isA(Function, pointer)
			pointer = pointer()
		if pointer == undefined then false else true
	, ks
extra.hasPath = hasPath


_throwIfMissesAnyPath = (paths, obj) ->
	hasPathResult = map flip(hasPath)(obj), paths
	if filter(extra.isFalse, hasPathResult).length > 0
		zipped = zip paths, hasPathResult
		pathsNotInObj = compose map ( (x) -> head(x) ), filter ( (x) -> ! last(x) ), zipped
		throw new Error "obj does not contain the following paths: [#{join(',', pathsNotInObj)}]"

# returns a partial copy of an object containing only the specified paths
# e.g. pickPaths ['a.a1', 'b'], {a: {a1: 1, a2: 1}, b: 123} returns {a: {a1: 1}, b: 123}
pickPaths = (paths, obj) ->
	_throwIfMissesAnyPath paths, obj
	newObj = {}
	forEach (x) ->
		extra.setInPath_ x, path(x, obj), newObj
	, paths
	return newObj
extra.pickPaths = pickPaths

# as pickPaths but returns the values flattened in an array
# e.g. pickPathsAsList ['a.a1', 'b'], {a: {a1: 1, a2: 1}, b: 123} returns [1, 123]
pickPathsAsList = (paths, obj) ->
	_throwIfMissesAnyPath paths, obj
	return Ra.map ( (x) -> path(x, obj) ), paths
extra.pickPathsAsList = pickPathsAsList
# pickPathsAsList ['a.a1', 'b'], {a: {a1: 1, a2: 1}, b: 123}

# as pickPaths but returns the values in a key-value structure where keys are the paths
# e.g. pickPathsAsMap ['a.a1', 'b'], {a: {a1: 1, a2: 1}, b: 123} returns {'a.a1:': 1, 'b': 123}
pickPathsAsMap = (paths, obj) ->
	_throwIfMissesAnyPath paths, obj
	return reduce ( (a, b) -> assoc b, path(b, obj), a ), {}, paths
extra.pickPathsAsMap = pickPathsAsMap
# pickPathsAsMap ['a', 'a.b'], {a: {b: 123}}

hasNestedNoOf = (str, obj) ->
	hasOwnProp = if has str, obj then 1 else 0
	return reduce (memo, k) ->
		memo + hasNestedNoOf str, obj[k]
	, hasOwnProp, keys(obj)
extra.hasNestedNoOf = hasNestedNoOf

hasNested = (str, obj) -> hasNestedNoOf(str, obj) > 0
extra.hasNested = hasNested

startsWith = (start, str) -> substringTo(length(start), str) == start
extra.startsWith = startsWith

# deeply clones a (potentially) nested object with the posibility to optionally set the value at all leaf nodes. You may
# pass a value or a predicate as the second argument. If you pass a predicate, that will be called with the value of the
# obj as its argument and the value being returned by the predicate is what will be set at that path in the cloned
# structure.
cloneStructure = (obj, valueAtLeaves = {}) ->
	ks = Ra.keys obj
	if ks.length == 0 then return if Ra.is(Function, valueAtLeaves) then valueAtLeaves(obj) else valueAtLeaves
	copy = {}
	Ra.forEach ( (k) -> copy[k] = cloneStructure(obj[k], valueAtLeaves) ), ks
	return copy
extra.cloneStructure = cloneStructure

# takes a (potentially) nested object structure and returns the same structure but at every leaf node the path to that
# leafnode is set as a string.
# eg. {a: {b: {b1: {}, b2: {}}}} gives {a: {b: {b1: 'a.b.b1', b2: 'a.b.b2'}}}
cloneStructureWithPaths = (data) ->
	path = arguments[1] || ''
	obj = {}
	Ra.forEach (x) ->
		newPath = "#{path}.#{x}"
		if isEmptyObject data[x] || Ra.isEmpty data[x]
			obj[x] = if Ra.head(newPath) == '.' then Ra.substringFrom 1, newPath else newPath
		else
			obj[x] = cloneStructureWithPaths data[x], newPath
	, Ra.keys(data)
	return obj
extra.cloneStructureWithPaths = cloneStructureWithPaths

# Same as replaceKeys but uses a predicate to determine new keys. If no key is returned from pred, the key is not substibuted
# e.g. replaceKeysBy ( (k, v) -> v+'1' ), {a: 'a2', b: 'b2', c: 'c2'} # returns {a21: 'a2', b21: 'b2', c21: 'c2'}
replaceKeysBy = (pred, obj) ->
	reduce (newObj, key) ->
		keyInNewObj = pred(key, obj[key]) || key
		return assoc keyInNewObj, obj[key], newObj
	, {}, keys(obj)
extra.replaceKeysBy = replaceKeysBy
# replaceKeysBy ( (k, v) -> k+'1' ), {a: 'a2', b: 'b2', c: 'c2'}

# Takes a map and returns a map with the same keys but all values exchanged to the keys
toEnum = (obj) -> mapObjIndexed ( (val, key) -> key ), obj
extra.toEnum = toEnum
# toEnum {a: 1, b: 2} # returns {a: 'a', b: 'b'}



# makes a shallow copy of an object and makes substitutions of speficied old keys to new keys
# e.g. replaceKeys {a: 'a1', b: 'b1'}, {a: 'a', b: 'b', c: 'c'} # returns {a1: 'a1', b1: 'b1', c: 'c'}
replaceKeys = (oldAndNewKeys, obj) -> replaceKeysBy ( (k, v) -> oldAndNewKeys[k] ), obj
extra.replaceKeys = replaceKeys
replaceKeys {a: 'a1', b: 'b1'}, {a: 'a', b: 'b', c: 'c'}






# a nicer api for React addons update
extra.update =
	set: (path, value, obj) ->
		cmd = extra.setInPath_ path, {$set: value}, {}
		React.addons.update obj, cmd
	apply: (path, pred, obj) ->
		cmd = extra.setInPath_ path, {$apply: pred}, {}
		React.addons.update obj, cmd
	push: (path, value, obj) ->
		if ! isArrayLike(value) then value = [value]
		cmd = extra.setInPath_ path, {$push: value}, {}
		React.addons.update obj, cmd
	merge: (path, value, obj) ->
		cmd = extra.setInPath_ path, {$merge: value}, {}
		React.addons.update obj, cmd



# version is not a fn, preserve length fn of window, is collides with Coffee's is
blackListedRamdasInBrowser = ['version', 'length', 'is']
blackListedRamdasInNode = ['version', 'is']


expose = (obj, isBrowser) ->
	# we want Ramda, lodash and extra in separete global objects for easy look-up in dev tools console
	obj.Ra = Ra
	obj._ = lo
	obj.extra = extra

	blackListedRamdas = isBrowser ? blackListedRamdasInBrowser : blackListedRamdasInNode
	removeBlacklistedRamdas = extra.differenceFlipped(blackListedRamdas)
	keysOfRamda = Ra.compose(removeBlacklistedRamdas, Ra.keys)(Ra)
	keysOfExtra = Ra.keys(extra)
	keysOfRamdaAndExtra = Ra.union(keysOfExtra, keysOfRamda)

	keysAlreadyInObj = Ra.filter ((key) -> Ra.has key, obj), keysOfRamdaAndExtra
	if Ra.length keysAlreadyInObj then	console.log('Following keys already exists in obj and will be replaced: ' + keysAlreadyInObj)

	# expose fns in Ramda and extra to obj for better fp capabilities in javascript
	Ra.forEach ((x) -> obj[x] = Ra[x]), keysOfRamda
	Ra.forEach ((x) -> obj[x] = extra[x]), keysOfExtra


functionalBootstrap =
	exposeInNodeOn: (obj) -> expose obj, false
	exposeInBrowserOn: (obj) -> expose obj, true

module.exports = functionalBootstrap
