const fetch = require('node-fetch')

const log = require('./log')
const getFormData = require('./getFormData')


const login = (loginurl, username, token) => {
    const form = getFormData({
        'user': username,
        'token': token,
        'script': 'true'
    })
    const options = {
        method: 'POST',
        body: form,
        headers: {
            'User-Agent': 'kattis-cli-submit'
        }
    }

    return fetch(loginurl, options)
        .then(response => {
            if (response.status != 200) {
                let error = 'Login failed.\n'
                if (response.status == 403)
                    error += 'Incorrect username or token'
                if (response.status == 404)
                    error += 'Incorrect login url'
                log.error(`${error} (status code: ${response.status})`)
            }
            const cookieString = response.headers.get('set-cookie')
            const cookies = cookieString.match(/__cfduid=(\w+)|EduSiteCookie=(\w+)/g)
            return `${cookies[1]}; ${cookies[0]};`
        })
        .catch(error => {
            log.error(`Login failed: ${error}`)
        })
}

module.exports = login