const log = require('./log')
const storage = require('./storage')
const languages = require('../languages.json')

const MUST_HAVE_KEYS = [
	'fileExt',
	'command'
]

let settings = {}

settings.problem = process.argv[2] || storage.get('problem')
if (settings.problem == null)
	log.error('Problem input not found')

settings.language = process.argv[3] || storage.get('language')
if (settings.language == null)
	log.error('Language input not found')

if (typeof languages[settings.language] === 'undefined') {
	// Try to find the language
	const foundKey = Object.keys(languages).find(key => {
		return (
			key.toLowerCase().replace(' ', '') === settings.language.toLowerCase() ||
			(languages[key].hasOwnProperty('alias') &&
				languages[key].alias.find(a => a == settings.language))
		)
	})
	if (typeof foundKey === 'undefined') {
		log.error(`Selected language '${settings.language}' does not exist`)
	} else {
		settings.language = foundKey
	}
}

Object.keys(languages[settings.language]).forEach(key => {
	settings[key] = languages[settings.language][key]
})

MUST_HAVE_KEYS.forEach(key => {
	if (!settings.hasOwnProperty(key))
		log.error(`Invalid syntax in 'languages.json' at '${settings.language}' language, could not find '${key}' property`)
})

module.exports = settings