const fetch = require('node-fetch')
const { TEST_STATUS, STATUS } = require('./constants')
const getCookie = require('./getCookie')

const getSubmission = async (submissionId, cookie) =>
	fetch(
		`https://open.kattis.com/submissions/${submissionId}?only_submission_row`,
		{
			credentials: 'include',
			headers: {
				accept: '*/*',
				'accept-language': 'sv-SE,sv;q=0.9,en-US;q=0.8,en;q=0.7,nb;q=0.6',
				'x-requested-with': 'XMLHttpRequest',
				cookie: cookie
			},
			referrer: `https://open.kattis.com/submissions/${submissionId}`,
			referrerPolicy: 'no-referrer-when-downgrade',
			body: null,
			method: 'GET',
			mode: 'cors'
		}
	)
		.then(res => res.json())
		.then(json => {
			var str = json.component
			var testCases = str.split('Test case ').slice(1)
			var parsedTestCases = testCases.map(x => x.split('">')[0].split(': ')[1])

			var prettyOutput = parsedTestCases
				.map(x => `[ ${TEST_STATUS[x]}  ]`)
				.join('')
			return {
				prettyOutput,
				status: json.status_id
			}
		})

const sleep = ms => {
	return new Promise(resolve => setTimeout(resolve, ms))
}

const poll = async submissionId => {
	const cookie = await getCookie()

	var prevStatus = STATUS.RUNNING
	while (prevStatus === STATUS.RUNNING) {
		const { prettyOutput, status } = await getSubmission(submissionId, cookie)
		prevStatus = status
		process.stdout.write('\x1Bc')
		console.log(prettyOutput)
		await sleep(1000)
	}
}

module.exports = poll
