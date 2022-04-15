const parseList = (list, placeholders) => {
	Object.keys(list).forEach(key => {
		if (Array.isArray(list[key]) || typeof list[key] === 'object')
			list[key] = parseList(list[key], placeholders)
		else
			list[key] = list[key].replace(/\${(\w+)}/g, function(__, key) {
				return placeholders[key] || key
			})
	})
	return list
}

module.exports = parseList