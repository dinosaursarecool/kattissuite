var fs = require('fs')
var AdmZip = require('adm-zip')
var request = require('request')
const path = require('path')


const getSampleData = (problem) => {
	const samplePath = path.join(__dirname, '..', 'SampleData', problem)
	if (!fs.existsSync(samplePath)) fs.mkdirSync(samplePath)

	const url = `https://open.kattis.com/problems/${problem}/file/statement/samples.zip`

	request.get({
		url,
		encoding: null
	}, (err, res, body) => {
		var zip = new AdmZip(body)
		var zipEntries = zip.getEntries()

		zipEntries.forEach((entry) =>
			fs.writeFileSync(path.join(samplePath, entry.entryName), zip.readFile(entry))
		)
	})
}

module.exports = getSampleData