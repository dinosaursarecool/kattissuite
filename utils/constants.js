const path = require('path')

const STATUS = {
    5: 'Running',
    14: 'Wrong answer',
    16: 'Success',
    RUNNING: 5,
}

const TEST_STATUS = {
    'Accepted': '✅',
    ACCEPTED: '✅',
    'Wrong Answer': '❌',
    WRONG_ANSWER: '❌',
    'not checked': '❔',
    NOT_CHECKED: '❔',
    RUN_TIME_ERROR: '⚠️',
    'Run Time Error': '⚠️'
}

const PATHS = {
    PROBLEMS: path.join(__dirname, '..', 'Problems'),
    ACCEPTED: path.join(__dirname, '..', 'Accepted'),
    TEMPLATES: path.join(__dirname, 'templates'),
    SAMPLE_DATA: path.join(__dirname, '..', 'SampleData'),
}

module.exports = {
    STATUS,
    TEST_STATUS,
    PATHS
}