const path = require('path')

const STATUS = {
    1: 'New',
    2: 'Waiting for compile',
    3: 'Compiling',
    4: 'Waiting for run',
    5: 'Running',
    6: 'Judge Error',
    7: 'Submission Error',
    8: 'Compile Error',
    9: 'Run Time Error',
    10: 'Memory Limit Exceeded',
    11: 'Output Limit Exceeded',
    12: 'Time Limit Exceeded',
    13: 'Illegal Function',
    14: 'Wrong answer',
    15: 'Presentation Error',
    16: 'Accepted',
    NEW: 1,
    WAITING_FOR_COMPILE: 2,
    COMPILING: 3,
    WAITING_FOR_RUN: 4,
    RUNNING: 5
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
    ROOT: path.join(__dirname, '..'),
    PROBLEMS: path.join(__dirname, '..', 'Problems'),
    ACCEPTED: path.join(__dirname, '..', 'Accepted'),
    TEMPLATES: path.join(__dirname, 'templates'),
    SAMPLE_DATA: path.join(__dirname, '..', 'SampleData'),
}

const STORAGE_NAMES = {
    ARGS: 'args',
    LANGUAGES: 'languages'
}

module.exports = {
    STATUS,
    TEST_STATUS,
    PATHS,
    STORAGE_NAMES
}