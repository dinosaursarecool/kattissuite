# kattissuite for https://open.kattis.com/

### Description
A helper suite to make it easier to run, test, and submit problems to Kattis

### Requirements
* [Node.js](https://nodejs.org/en/download/)
* Download [.kattisrc](https://open.kattis.com/download/kattisrc) and add it to the project root

### Definitions
* `problem`: Kattis Problem ID
* `language`: Kattis language ID
* `tag`: The tag listed in `langugages.json` for the given language

### Commands
#### Initialize
```
npm run init <problem> <language|tag>
```
fetches samples for the given problem and creates a new code file for that problem by copying `<language>.<extension>` file.  
The problem and language is saved in a local .json file for further use.
#### Run tests
```
npm run test [<problem>] [<language|tag>]
```
Runs the sample tests for the given problem. The arguments here is **optional**, if nothing is given the saved problem and language from the initial stage will be used.
#### Submit
```
npm run submit [<problem>] [<language|tag>]
```
Submits the given problem to Kattis and periodically polls the test results of the submission. The arguments here is **optional**, if nothing is given the saved problem and language from the initial stage will be used.

### Template
The template files are how the initial file will look like with the given language. These files are located at `./utils/templates`. Modify these to your preferences.

### Languages
Every language in [Kattis](https://open.kattis.com/) is supported. If your language is not yet added in `languages.json` you can add it by follow the instructions below.

#### Add language
* Open up ```./languages.json```
* It should look something like this
```javascript
{
    "C": {
        "tags": [
            "c"
        ],
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
    "JavaScript (Node.js)": {
        "tags": [
            "node",
            "js",
            "javascript"
        ],
        "fileExt": "js",
        "command": "node",
        "args": [
            "${problemFile}"
        ]
    },
    ...
}
```
* Extend the list by adding your language name from [Kattis](https://open.kattis.com/help) as the key for example:
```javascript
{
    ...
    "Python 3": {
        
    },
    ...
}
```
* Add the following properties to fit your needs
    * Required properties:
        * `tags`: Shortcut for identifying languages when using commands
        * `fileExt`: The file extension your language uses
        * `command`: The command used to execute the script with the given language
    * Optional properties:
        * `args`: The arguments for the command
        * `compiler`: If the language require compiling before executing
            * `command`: The command used compile the script
            * `args`: The arguments for the compiler command
Example:
```javascript
{
    ...
    "Python 3": {
        "tags": [ "py", "python" ],
        "command": "python",
        "args": [
            "${problemFile}"
        ],
    },
    ...
}
```
* Proceed to add a template for the new language

#### Add template
* Go to `./utils/templates`
* Create a new file `<language>.<fileExt>`. Example: `Python 3.py`
* Open up the created file and modify it to your preferences

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


### Variables reference
* `${problemFile}`: The path to the given problem file
* `${workspaceFolder}`: The path to the current workspace folder
