const getSampleData = require('./getSampleData')
const fs = require('fs');
const path = require('path');
const DEFAULT_FILE_TEMPLATE_NAME = 'defaultFileTemplate'

const problem = process.argv[2]
const files = fs.readdirSync(__dirname)
const template = files.find(x => x.startsWith(DEFAULT_FILE_TEMPLATE_NAME))
const fileType = template.split('.')[1]
const problemPath = path.join(__dirname, '..', 'Problems', `${problem}.${fileType}`)
const templatePath = path.join(__dirname, template)

getSampleData(problem)

fs.copyFileSync(templatePath, problemPath, {
    flag: 'wx'
})