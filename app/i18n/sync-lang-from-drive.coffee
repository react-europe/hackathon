# TO SYNC:
# ----------------

# 1. Make sure the appropriate chages are made to "Quinyx Webpunch 3 Localisation" in the Translations folder on
# Quinyx's google drive. 2. Until tabletop fixes https://github.com/jsoma/tabletop/issues/57...
#			2.1 copy the entire document (ctrl+a, ctrl+c) 
#			2.2 paste in into this document
#     https://docs.google.com/a/cottin.se/spreadsheets/d/1Twn_mphDKegHNmSOjYdmhFj-HMjgTTs3kDlG8HM1Bc4/edit#gid=0
# 3. run this from your terminal: coffee sync-lang-from-drive.coffee
# 4. from your terminal run: git difftool      ...and review that the appropriate changes were made. Please note that
# people sometimes seem to add tabs and other weird characters when editing the spreadsheet, so you might need to clean
# up the spreadsheet manually and run the sync command again.

Tabletop = require("tabletop")
fs = require('fs');
_ = require("lodash")

console.log('Sending request to goolge docs...');

Tabletop.init(
	key: '1Twn_mphDKegHNmSOjYdmhFj-HMjgTTs3kDlG8HM1Bc4'
	callback: (sheets, tabletop) ->
		data = sheets.Sheet1

		console.log('data recieved')
		langs = _.filter(data.column_names, (x) -> x.length == 2)
		console.log(langs.length + ' languages detected ' + langs.join(', '))

		_.each langs, (lang) ->
			text = _.chain(data.elements)
								.filter((x) -> !!x[lang]) # nothing specified => skip tag
								.map((x) -> "\t\t\"#{x.tag}\": \"#{x[lang]}\"")
								.value()
								.join(',\n')

			text = "{\n\t\"Translations\": {\n#{text}\n\t}\n}\n"

			fileName = "./#{lang}.json"
			fs.writeFile fileName, text, (err) ->
				if err then console.log(err)
				else console.log("The file " + fileName + " was saved!")
	)
