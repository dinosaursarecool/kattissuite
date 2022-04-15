const path = require('path')
const normalizeNewline = require('normalize-newline')
const fs = require('fs')
const { spawn } = require('child_process')

const { TEST_STATUS, PATHS } = require('./constants')
const parseList = require('./parseList')
const log = require('./log')
const settings = require('./settings')

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

const runTests = async (command, args, sampleData) => {
	let count = 0
	const results = new Array(Object.keys(sampleData).length)
	for (let index = 0; index < results.length; index++) results[index] = {}

	log.notice('Running tests...')
	for (const key in sampleData) {
		const result = results[count]
		const testCase = sampleData[key]['.in']
		const expectedOutput = sampleData[key]['.ans']

		const child = spawn(command, args)
		child.stdin.end(testCase)

		let output = ''
		child.stderr.on('data', data => {
			process.stdout.write(`\x1B[31m${data}\x1B[0m`)
		})
		for await (const data of child.stdout) output += data.toString()
		result['output'] = normalizeNewline(output)
		result['expectedOutput'] = normalizeNewline(expectedOutput)

		if (Object.is(result['output'], result['expectedOutput']))
			result['status'] = TEST_STATUS.ACCEPTED
		else
			result['status'] = TEST_STATUS.WRONG_ANSWER
		count++
	}
	let prettyOutput = '\x1B[31m- actual \x1B[32m+ expected\x1B[0m\n'
	results.forEach(r => {
		prettyOutput += `[ ${r['status']}  ]: \x1B[31m- ${JSON.stringify(r['output'])}\n` +
            `\t\x1B[32m+ ${JSON.stringify(r['expectedOutput'])}\x1B[0m\n`
	})
	process.stdout.write(prettyOutput)
}

const start = () => {
	const problem = settings.problem
	const problemExt = settings.fileExt

	const problemFile = path.join(PATHS.PROBLEMS, `${problem}.${problemExt}`)
	if (!fs.existsSync(problemFile)) {
		log.warn(`Selected problem \'${problem}.${problemExt}\' does not exist`)
		return
	}
	parseList(settings, { 'problemFile': problemFile, 'workspaceFolder': process.cwd() })

	const samplePath = path.join(PATHS.SAMPLE_DATA, problem, '\\')
	// TODO: Check if we have sample data and fetch it if we don't...
	const sampleData = readSampleData(samplePath)
	// Compile if 'compiler' property is set in language.json else just run...
	if (settings.hasOwnProperty('compiler')) {
		const compilerExec = spawn(settings.compiler['command'], settings.compiler['args'] || [])
		compilerExec.stderr.on('data', (data) => {
			console.log(data.toString())
		})
		compilerExec.on('close', (data) => {
			if (data === 0) {
				log.notice('Compiled successfuly')
				runTests(settings.command, settings.args || [], sampleData)
			}
			else
				log.error('Compile failed')
		})
	}
	else
		runTests(settings.command, settings.args || [], sampleData)
}

start()