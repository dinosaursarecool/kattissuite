const path = require('path')
const { spawn } = require('child_process')
const poll = require('./testPoller')

const submit = async problem => {
	const submitPath = path.join(__dirname, 'submit.py')
	const problemPath = path.join(__dirname, '..', 'Problems', `${problem}.js`)
	const child = spawn('python', [`${submitPath}`, '-p', problem, '-f', `${problemPath}`])

	let output = ''
	for await (const data of child.stdout) output += data.toString()

	const submissionId = parseInt(output)
	if (submissionId) console.log(`Successfully submitted problem ${problem} to Kattis.`)

	return submissionId
}

const run = async () => {
	const problem = process.argv[2]
	const submissionId = await submit(problem)
	await poll(submissionId)
}

run()