


# Taken from Hyper project at https://github.com/xixixao/hyper
# Allow child components as first argument to parent component
#
# _Test _div()
#
domWrapper = (tag) ->
	(attributes, contents...) ->
		if typeof attributes is 'object' and
		not (Array.isArray attributes) and
		not (React.isValidElement attributes)
			React.createElement tag, attributes, contents...
		else
			React.createElement tag, {}, ([attributes].concat contents)...

usedTags = [
	'a'
	'aside'
	'blockquote'
	'br'
	'canvas'
	'dd'
	'div'
	'dl'
	'dt'
	'em'
	'fieldset'
	'footer'
	'form'
	'h1'
	'h2'
	'h3'
	'h4'
	'h5'
	'h6'
	'header'
	'i'
	'img'
	'input'
	'label'
	'li'
	'line'
	'nav'
	'ol'
	'optgroup'
	'option'
	'p'
	'path'
	'rect'
	'section'
	'select'
	'span'
	'sub'
	'sup'
	'svg'
	'table'
	'tbody'
	'td'
	'textarea'
	'tfoot'
	'th'
	'thead'
	'time'
	'tr'
	'ul'
]

nodesNoPrefix = {}
_.forEach usedTags, (tag) ->
	nodesNoPrefix[tag] = domWrapper tag

module.exports = nodesNoPrefix
