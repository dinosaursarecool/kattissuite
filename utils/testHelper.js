const path = require('path')
const normalizeNewline = require('normalize-newline')
const fs = require('fs')
const { spawn } = require('child_process')
const assert = require('assert')
const { TEST_STATUS } = require('./constants')

const problem = process.argv[2]
const problemPath = path.join(__dirname, '..', 'Problems', `${problem}.js`)
const samplePath = path.join(__dirname, '..', 'SampleData', problem, '\\')

const sampleData = {}

function readFilesSync(dir) {
	fs.readdirSync(dir).forEach(filename => {
		const { name, ext } = path.parse(filename)
		const filepath = path.resolve(dir, filename)

		const data = fs.readFileSync(filepath).toString()
		if (!sampleData[name]) sampleData[name] = {}

		sampleData[name][ext] = data
	})
}

readFilesSync(samplePath)

let count = 1
const results = new Array(Object.keys(sampleData).length).fill(
	TEST_STATUS.NOT_CHECKED
)
const run = async () => {
	for (const key in sampleData) {
		const input = sampleData[key]['.in']
		const expectedOutput = sampleData[key]['.ans']
		const child = spawn('node', [problemPath]) // TODO: replace hard coded node with other options...
		child.stdin.write(input)
		child.stdin.end()

		let output = ''
		for await (const data of child.stdout) {
			output += data.toString()
		}

		assert.strictEqual(
			normalizeNewline(output),
			normalizeNewline(expectedOutput)
		)

		results[count - 1] = TEST_STATUS.ACCEPTED
		const prettyOutput = results.map(x => `[ ${x}  ]`).join('')
		process.stdout.write('\x1Bc')
		console.log(prettyOutput)
		count++
	}
}

run()
