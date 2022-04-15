const LOG_LEVELS = {
	'error': '\x1b[31;4;1mError\x1b[0m',
	'warn': '\x1b[33;4;1mWarning\x1b[0m',
	'notice': '\x1b[32;4;1mNotice\x1b[0m'
}

const error = (msg) => {
	log(msg, 'error')
	process.exit(0)
}

const warn = (msg) => {
	log(msg, 'warn')
}

const notice = (msg) => {
	log(msg, 'notice')
}

const log = (msg, level = 'notice') => {
	process.stdout.write(`${LOG_LEVELS[level]}: ${msg}\n`)
}

module.exports = {
	error,
	warn,
	notice
}