const path = require('path')
const { spawn } = require('child_process')
const fs = require('fs')

const { PATHS } = require('./constants')
const poll = require('./testPoller')
const settings = require('./settings')
const log = require('./log')

const submit = async (problem, problemExt) => {
	const submitPath = path.join(__dirname, 'submit.py')
	const problemPath = path.join(PATHS.PROBLEMS, `${problem}.${problemExt}`)
	const child = spawn('python', [`${submitPath}`, '-p', problem, '-f', `${problemPath}`])

	let output = ''
	for await (const data of child.stdout) output += data.toString()

	const submissionId = parseInt(output)
	if (submissionId) console.log(`Successfully submitted problem ${problem} to Kattis.`)

	return submissionId
}

const run = async () => {
	const problem = settings.problem
	const problemExt = settings.fileExt

	const problemPath = path.join(PATHS.PROBLEMS, `${problem}.${problemExt}`)
	if (!fs.existsSync(problemPath)) {
		log.warn(`Selected problem '${problem}.${problemExt}' does not exist`)
		return
	}

	const submissionId = await submit(problem, problemExt)
	const result = await poll(submissionId)
	if (result.length == 0) {
		log.error('Submission failed, something wrong happened...')
		return
	}
	for (let index = 0; index < result.length; index++) {
		if (result[index] != 'Accepted') {
			log.notice('You did not pass, better luck next time')
			return
		}
	}

	const acceptedPath = path.join(PATHS.ACCEPTED, `${problem}.${problemExt}`)
	fs.rename(problemPath, acceptedPath, err => {
		if (err) log.error(err)
		log.notice('Congratulations you passed! File successfuly moved to accepted folder')
	})
}

run()