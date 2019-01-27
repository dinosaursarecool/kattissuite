const path = require('path')
const normalizeNewline = require('normalize-newline')
const fs = require('fs')
const { spawn } = require('child_process')
const assert = require('assert')
const { TEST_STATUS } = require('./constants')

const readSampleData = dir => {
	const sampleData = {}
	fs.readdirSync(dir).forEach(filename => {
		const { name, ext } = path.parse(filename)
		const filePath = path.resolve(dir, filename)

		const data = fs.readFileSync(filePath).toString()
		if (!sampleData[name]) sampleData[name] = {}

		sampleData[name][ext] = data
	})

	return sampleData
}

const run = async () => {
	const problem = process.argv[2]
	const problemPath = path.join(__dirname, '..', 'Problems', `${problem}.js`)
	const samplePath = path.join(__dirname, '..', 'SampleData', problem, '\\')
	
	// TODO: Check if we have sample data and fetch it if we don't...
	const sampleData = readSampleData(samplePath)

	let count = 0
	const results = new Array(Object.keys(sampleData).length).fill(TEST_STATUS.NOT_CHECKED)

	for (const key in sampleData) {
		const testCase = sampleData[key]['.in']
		const expectedOutput = sampleData[key]['.ans']
		const child = spawn('node', [problemPath]) // TODO: replace hard coded node with other options...
		child.stdin.end(testCase)

		let output = ''
		for await (const data of child.stdout) output += data.toString()

		assert.strictEqual(
			normalizeNewline(output),
			normalizeNewline(expectedOutput)
		)

		results[count++] = TEST_STATUS.ACCEPTED
		const prettyOutput = results.map(x => `[ ${x}  ]`).join('')
		console.log('\x1Bc', prettyOutput)
	}
}

run()