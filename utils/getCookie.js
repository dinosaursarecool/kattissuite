const path = require('path')
const {
	spawn
} = require('child_process')

const getCookie = async () => {
	const loginPath = path.join(__dirname, 'login.py')
	const child = spawn('python', [loginPath])

	var output = ''
	for await (const data of child.stdout) {
		output = output + data.toString()
	}
	output = output.split('\'').join('"')
	const json = JSON.parse(output)
	const cookie = `EduSiteCookie=${json.EduSiteCookie}; __cfduid=${json.__cfduid};`
	return cookie
}

module.exports = getCookie