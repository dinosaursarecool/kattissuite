const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


var input = []
rl.on('line', (line) => input.push(line))

rl.on('close', () => {
    // Problem here

    process.exit()
})