request = require 'superagent-bluebird-promise'
{curry} = require 'ramda'
{arrayOf} = normalizr = require 'normalizr'
normalize = curry normalizr.normalize
config = require('./config')
{mergeIntoTree} = require './utils'

instance = null

getInstance = -> instance ?= new ApiHelper()

class ApiHelper # Singleton

	onUnauthorised: (onUnauthorised) ->	@_onUnauthorised = onUnauthorised

	getRoot: -> config.get('api')

	getApiUrl: (extra) =>
		urlParts = [@getRoot()]
		if extra? then urlParts.push extra.replace(/(Model|Collection)/, '')
		urlParts.join('/')

	get: ({ url, onSuccess, onFail }) ->
		request.get url
			.withCredentials()
			.then (res) ->
				onSuccess? res
		,
			(err) ->
				if err.res?.unauthorized then @_onUnauthorised?()
				console.error err
				onFail? err

	getAndNormalize: ({ url, schema }) =>
		@get
			url: url
			onSuccess: (res) ->
				console.log res.body, arrayOf schema
				normalize(res.body, arrayOf schema).entities
			onFail: ->
				console.log 'fuck'
				throw new Error()


	getAndMerge: ({ url, schema, tree, splitObj, onSuccess, onFail }) =>
		@getAndNormalize {url, schema}
			.then (entities) ->
				mergeIntoTree entities, splitObj, tree
			.then onSuccess
			.catch onFail

module.exports = getInstance()
