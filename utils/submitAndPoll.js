const poll = require('./testPoller')
const path = require('path')
const {
    spawn
} = require('child_process')
const problem = process.argv[2]


const submit = async () => {
    const submitPath = path.join(__dirname, 'submit.py')
    const problemPath = path.join(__dirname, '..', 'Problems', `${problem}.js`)
    const child = spawn('python', [`${submitPath}`, `-p`, problem, `-f`, `${problemPath}`])

    var output = ""
    for await (const data of child.stdout) {
        output = output + data.toString()
    };

    var submissionId = parseInt(output)
    if (submissionId) {
        console.log(`Successfully submitted problem ${problem} to Kattis.`)
    }
    await poll(submissionId)
}


const run = async () => {
    await submit()
}

run()