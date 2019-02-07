const path = require('path')
const { spawn } = require('child_process')
const fs = require('fs')
const ini = require('ini')
const fetch = require('node-fetch')

const { PATHS } = require('./constants')
const poll = require('./testPoller')
const submit = require('./submit')
const settings = require('./settings')
const log = require('./log')
const getFormData = require('./getFormData')

const verifyConfig = (config) => {
    if (typeof config.kattis == 'undefined' ||
        typeof config.user == 'undefined' ||
        typeof config.kattis.loginurl == 'undefined' ||
        typeof config.kattis.submissionurl == 'undefined' ||
        typeof config.user.username == 'undefined' ||
        typeof config.user.token == 'undefined')
        return false
    return true
}

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
}

const run = async () => {
    const problem = settings.problem
    const problemExt = settings.fileExt
    const language = settings.language

    const problemPath = path.join(PATHS.PROBLEMS, `${problem}.${problemExt}`)
    if (!fs.existsSync(problemPath)) {
        log.warn(`Selected problem \'${problem}.${problemExt}\' does not exist`)
        return
    }

    const configPath = path.join(PATHS.ROOT, '.kattisrc')
    config = ini.parse(fs.readFileSync(configPath, 'utf-8').replace(/: /g, '='))
    if (!verifyConfig(config))
        log.error(`Your .kattisrc file appears corrupted. It must provide a token (or a KATTIS password).
        Please download a new.kattisrc file`)

    let loginCookies = await login(config.kattis.loginurl, config.user.username, config.user.token)
    const submissionId = await submit(loginCookies, problem, problemExt, problemPath, language, '')
    if (submissionId == null)
        log.error('Submit failed, something wrong happened...')
    log.notice(`Successfully submitted problem ${problem} to Kattis.`)

    loginCookies = await login(config.kattis.loginurl, config.user.username, config.user.token)
    const result = await poll(loginCookies, submissionId)
    if (result.length == 0)
        log.error('Submission failed, something wrong happened...')
    for (let index = 0; index < result.length; index++) {
        if (result[index] != 'Accepted') {
            log.notice('You did not pass, better luck next time')
            return
        }
    }

    const acceptedPath = path.join(PATHS.ACCEPTED, `${problem}.${problemExt}`)
    fs.rename(problemPath, acceptedPath, err => {
        if (err) log.error(err)
        log.notice('Congratulations you passed! File successfuly moved to accepted folder')
    })
}

run()