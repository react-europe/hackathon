
# INTRO TO LIVE PROGRAMMING IN COFFEE SCRIPT
# ------------------------------------------------
# TODO: add description to why we do this and how to start using live codeing with the REPL


libs =
	chai: require('chai')

expose = (obj, isBrowser) ->
	obj.libs = libs


liveCodeingBootstrap =
	exposeInNodeOn: (obj) -> expose obj, false
	exposeInBrowserOn: (obj) -> expose obj, true

module.exports = liveCodeingBootstrap
