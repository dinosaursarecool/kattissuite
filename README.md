# kattissuite for https://open.kattis.com/

### Description
A helper suite to make it easier to run, test, and submit problems to Kattis

### Requirements
[python 3](https://www.python.org/)__
[nodejs](https://nodejs.org/en/download/)__
.kattisrc (download from https://open.kattis.com/download/kattisrc and add it to the project root)

### Definitions
**problem**: Kattis Problem ID

### Commands
#### Initialize
```
npm run init <problem> <language>
```
fetches samples for the given problem and creates a new code file for that problem by copying **_\<your language\>__template._\<language extension\>_** file.
The problem and language is saved in a local .json file for further use
#### Run tests
```
npm run test [<problem>] [<language>]
```
Runs the sample tests for the given problem. The problem and language here is **optional**, if nothing is given the saved problem and language from the initial stage will be used.
#### Submit
```
npm run submit [<problem>] [<language>]
```
Submits the given problem to Kattis and periodically polls the test results of the submission. The problem and language here is **optional**, if nothing is given the saved problem and language from the initial stage will be used.

### Template
The template files are how the initial file will look like with the given language.
These files are located at ```./utils/templates```. Simply modify these to your liking.


### Add language
* Open up ```./languages.json```
* It should look something like this
```javascript
{
    "c": {
        "fileExt": "c",
        "command": "./problem.exe",
        "compiler": {
            "command": "gcc",
            "args": [
                "-g",
                "${problemFile}",
                "-o",
                "${workspaceFolder}/problem.exe"
            ]
        }
    },
    "node": {
        "fileExt": "js",
        "command": "node",
        "args": [
            "${problemFile}"
        ]
    }
}
```
Simply extend this file by adding a new language with the the given properties where ```"compiler"``` property is optional.
#### Add template
When a language has been added you need to add the template for the given Language.
* Go to ```./utils/templates```
* Create a new file ```<language>_template.<fileExt>```
* Open up the created file and modify it to your liking

#### Supported languages:
    '.c': 'C',
    '.c#': 'C#',
    '.c++': 'C++',
    '.cc': 'C++',
    '.cpp': 'C++',
    '.cs': 'C#',
    '.cxx': 'C++',
    '.go': 'Go',
    '.h': 'C++',
    '.hs': 'Haskell',
    '.java': 'Java',
    '.js': 'JavaScript (Node.js)',
    '.m': 'Objective-C',
    '.pas': 'Pascal',
    '.php': 'PHP',
    '.pl': 'Prolog',
    '.py': 'Python',
    '.rb': 'Ruby'
