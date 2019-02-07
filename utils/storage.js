const fs = require('fs')

store = (name, items) => {
    save = true
    if (!storedItems.hasOwnProperty(name))
        storedItems[name] = {}
    Object.keys(items).forEach(key => {
        storedItems[name][key] = items[key]
    })
}

get = (name, key = null) => {
    if (storedItems.hasOwnProperty(name))
        if (key == null)
            return storedItems[name]
        else if (storedItems[name].hasOwnProperty(key))
            return storedItems[name][key]
    return null
}

process.once('beforeExit', () => {
    if (save) {
        const data = JSON.stringify(storedItems)
        fs.writeFileSync('./utils/storage.json', data)
    }
})

let save = false
let storedItems = {}
try {
    storedItems = require('./storage.json')
}
catch (e) { }

module.exports = {
    store,
    get
}