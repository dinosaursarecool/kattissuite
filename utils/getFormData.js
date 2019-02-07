const FormData = require('form-data')

const getFormData = (data) => {
    const form = new FormData()
    Object.keys(data).forEach(key => form.append(key, data[key]))
    return form
}

module.exports = getFormData