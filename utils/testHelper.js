const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const assert = require('assert');
const {TEST_STATUS} = require('./constants')

const problem = process.argv[2]
const problemPath = path.join(__dirname, '..', 'Problems', problem + '.js')
const samplePath = path.join(__dirname, '..', 'SampleData', problem, '\\')

const sampleData = {}
function readFilesSync(dir) {
    const files = [];
  
    fs.readdirSync(dir).forEach(filename => {
      const name = path.parse(filename).name;
      const ext = path.parse(filename).ext;
      const filepath = path.resolve(dir, filename);
      const stat = fs.statSync(filepath);
      const isFile = stat.isFile();

      const data = fs.readFileSync(filepath).toString()
      if(!sampleData[name])
        sampleData[name] = {}
      
      sampleData[name][ext] = data
    });
}

readFilesSync(samplePath)

var count = 1
var results = new Array(Object.keys(sampleData).length).fill(TEST_STATUS.NOT_CHECKED)
// console.log(results)
const run = async () => {
for (var key in sampleData){
    // console.log('➡️Running test case', count, `(${key})`)
    const input = sampleData[key]['.in']
    const expectedOutput = sampleData[key]['.ans']
    const child = spawn('node', [problemPath]) // TODO: replace hard coded node with other options...
    // console.log('   Giving input', input)
    child.stdin.write(input)
    child.stdin.end()

    
    // console.log('   Expected output', expectedOutput)
    var output = ""
    for await (const data of child.stdout) {
        // console.log(`stdout from the child: ${data}`);
        output = output + data.toString()
      };

    // console.log('   Actual output', output)

    assert.strictEqual(output, expectedOutput)
    
    results[count - 1] = TEST_STATUS.ACCEPTED
    var prettyOutput = results.map(x => `[ ${x}  ]`).join('')
    // console.log('✅ Passed test', count, )
    process.stdout.write('\033c');
    console.log(prettyOutput)
    count++
}}

run()