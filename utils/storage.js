const fs = require('fs')

const store = (items) => {
	Object.keys(items).forEach(key => {
		items[key] = items[key]
	})
	const data = JSON.stringify(items)
	fs.writeFileSync('./utils/storage.json', data)
}

const get = (key) => {
	if (typeof items[key] !== 'undefined')
		return items[key]
	return null
}

let items = {}
try {
	items = require('./storage.json')
}
catch (e) {}

module.exports = {
	store,
	get
}