const poll = require('./testPoller')
const path = require('path');
const {
    spawn
} = require('child_process');
const problem = process.argv[2]


const submit = async () => {
    const submitPath = path.join(__dirname, 'submit.py')
    const problemPath = path.join(__dirname, '..', 'Problems', `${problem}.js`)

    // console.log('submitPath: ', submitPath, 'problemPath:', problemPath)
    const child = spawn('python', [`${submitPath}`, `-p`, problem, `-f`, `${problemPath}`])

    var output = ""
    for await (const data of child.stdout) {
        output = output + data.toString()
    };

    // var err = ""
    // for await (const data of child.stderr) {
    //     err = err + data.toString()
    // };

    // console.log('output', output)
    var submissionId = parseInt(output)
    if (submissionId){
        console.log(`Successfully submitted problem ${problem} to Kattis.`)
    }
    await poll(submissionId)
    // console.log('err', err)

}


const run = async () => {

    await submit()

}


run()