const fs = require('fs')
const path = require('path')

const { PATHS, STORAGE_NAMES } = require('./constants')
const log = require('./log')
const storage = require('./storage')

const MUST_HAVE_KEYS = [
    'fileExt',
    'command'
]

const expandTags = (obj) => {
    Object.keys(obj).forEach(key => {
        obj[key]['language'] = key
        if (obj[key].hasOwnProperty('tags')) {
            const tags = obj[key]['tags']
            delete obj[key]['tags']
            const value = obj[key]
            tags.forEach(tag => obj[tag] = value)
        }
    })
}

const checkLanguageSyntax = (language, properties) => {
    properties.forEach(key => {
        if (!language.hasOwnProperty(key))
            log.error(`Invalid syntax in \'languages.json\' at \'${language['language']}\' language, could not find \'${key}\' property`)
    })
}

const getFileUpdateDateMs = (path) => {
    const stats = fs.statSync(path)
    return stats.mtimeMs
}

let settings = {}

settings.problem = process.argv[2] || storage.get(STORAGE_NAMES.ARGS, 'problem')
if (settings.problem == null)
    log.error('Problem input not found')

let languages = storage.get(STORAGE_NAMES.LANGUAGES)
const langFileModMs = getFileUpdateDateMs(path.join(PATHS.ROOT, 'languages.json'))
if (languages == null || languages['file-modified-timestamp'] != langFileModMs) {
    languages = require('../languages.json')
    expandTags(languages)
    languages['file-modified-timestamp'] = langFileModMs
    storage.store(STORAGE_NAMES.LANGUAGES, languages)
}

const languageKey = process.argv[3] || storage.get(STORAGE_NAMES.ARGS, 'language')
if (languageKey == null)
    log.error('Language input not found')

if (!languages.hasOwnProperty(languageKey))
    log.error(`Selected language \'${languageKey}\' does not exist`)
const language = languages[languageKey]

checkLanguageSyntax(language, MUST_HAVE_KEYS) // Exit on invalid syntax

Object.keys(language).forEach(key => {
    settings[key] = language[key]
})

module.exports = settings