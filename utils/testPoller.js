const fetch = require('node-fetch')
const { TEST_STATUS, STATUS } = require('./constants')
const getCookie = require('./getCookie')

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const getSubmission = async (submissionId, cookie) =>
	fetch(`https://open.kattis.com/submissions/${submissionId}?only_submission_row`, { headers: { cookie: cookie } })
		.then(res => res.json())
		.then(json => {
			var testComponent = json.component
			var htmlTestCases = testComponent.split('Test case ').slice(1)
			var testCases = htmlTestCases.map(x => x.split('">')[0].split(': ')[1])

			var status = testCases.map(x => `[ ${TEST_STATUS[x]}  ]`).join('')
			return { status, state: json.status_id }
		})

const poll = async submissionId => {
	const cookie = await getCookie()

	var prevState = STATUS.RUNNING
	while (prevState === STATUS.RUNNING) {
		const { status, state } = await getSubmission(submissionId, cookie)
		console.log('\x1Bc', status)
		prevState = state
		await sleep(1000)
	}
}

module.exports = poll
