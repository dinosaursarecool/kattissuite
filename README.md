# kattissuite for https://open.kattis.com/

### Requirements
python 3, nodejs,
.kattisrc (download from https://open.kattis.com/download/kattisrc and add it to the project root)

### Definitions
**problem**: Kattis Problem ID

### Commands
**npm run init _\<problem\>_** fetches samples for the given problem and creates a new code file for that problem by copying defaultFileTemplate.
Replace defaultFileTemplate.<your language> as you please.

**npm run test _\<problem\>_** runs the sample tests for the given problem

**npm run submit _\<problem\>_** submits the given problem to kattis and periodically polls the test results of the submission
