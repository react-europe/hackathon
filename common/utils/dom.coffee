module.exports =
	isDescendant: (parent, child) ->
		node = child.parentNode
		while node?
			if node is parent
				return true
			node = node.parentNode
		false

	randomString: ->
		text = ''
		possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
		i = 0

		while i < 8
			text += possible.charAt(Math.floor(Math.random() * possible.length))
			i++
		text

	addBodyClass: (className) ->
		body = document.getElementsByTagName('body')[0]
		body.classList.add className

	removeBodyClass: (className) ->
		body = document.getElementsByTagName('body')[0]
		body.classList.remove className

	isOnLeftHalf: (node) ->
		node.getBoundingClientRect().left < window.innerWidth / 2

	isOnTopHalf: (node) ->
		node.getBoundingClientRect().top < window.innerHeight / 2


	findParent: (child, root, filter) ->
		loop
			if filter(child)
				return child
			if root and child == root
				return false
			unless child = child.parentNode
				break
		false

