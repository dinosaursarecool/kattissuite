const fs = require('fs')
const path = require('path')

const { PATHS } = require('./constants')
const log = require('./log')
const getSampleData = require('./getSampleData')
const storage = require('./storage')
const settings = require('./settings')

const problem = settings.problem
const problemExt = settings.fileExt
const language = settings.language

storage.store({
	'language': language,
	'problem': problem
})

const templateFileName = `${language}_template.${problemExt}`
const templatePath = path.join(PATHS.TEMPLATES, templateFileName)
if (!fs.existsSync(templatePath)) log.error(`Could not find ${templatePath}`)

const problemPath = path.join(PATHS.PROBLEMS, `${problem}.${problemExt}`)
if (!fs.existsSync(problemPath))
	fs.copyFileSync(templatePath, problemPath)
else
	log.notice(`Problem '${problem}' already exists`)

getSampleData(problem)