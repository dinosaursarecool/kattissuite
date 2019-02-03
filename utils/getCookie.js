const path = require('path')
const { spawn } = require('child_process')

const getCookie = async () => {
	const loginPath = path.join(__dirname, 'login.py')
	const child = spawn('python', [loginPath])

	var output = ''
	for await (const data of child.stdout) output = output + data.toString()

	const body = JSON.parse(output.split('\'').join('"'))
	return `EduSiteCookie=${body.EduSiteCookie}; __cfduid=${body.__cfduid};`
}

module.exports = getCookie