const fs = require('fs')
const fetch = require('node-fetch')

const log = require('./log')
const getFormData = require('./getFormData')

const submit = async (loginCookies, problem, fileExt, filePath, language, mainClass) => {


    const form = getFormData({
        'submit': 'true',
        'submit_ctr': 2,
        'language': language,
        'mainclass': mainClass,
        'problem': problem,
        'tag': '',
        'script': 'true'
    })
    form.append('sub_file[]', fs.createReadStream(filePath), `${problem}.${fileExt}`)
    const headers = {
        cookie: loginCookies
    }
    return fetch(config.kattis.submissionurl, {
        method: 'POST',
        body: form,
        headers: headers
    })
        .then(response => { // Submission response
            if (response.status != 200) {
                let error = 'Submission failed.\n'
                if (response.status == 403)
                    error += 'Access denied'
                if (response.status == 404)
                    error += 'Incorrect submit url'
                log.error(`${error} (status code: ${response.status})`)
            }
            console.log(response.url)
            return response.text()
        })
        .then(response => {
            plainResponse = response.replace('<br />', '\n')
            const submissionId = plainResponse.match(/Submission ID: (\d+)/g)
            if (submissionId != null)
                return parseInt(submissionId[0].split(': ')[1])
            return null
        })
        .catch(error => {
            log.error(`Submit connection failed: ${error}`)
        })
}

module.exports = submit