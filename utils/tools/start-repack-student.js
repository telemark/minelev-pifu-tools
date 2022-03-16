const isStudent = require('../../lib/is-student')
const persons = require('../../data/persons.json')
const { logger } = require('@vtfk/logger')
const repackPerson = require('../../lib/repack-person')

const args = process.argv.slice(2)
if (args.length === 0) {
  console.error('Pass student fnr along (node start-repack-student.js 01234567890)')
  process.exit(1)
}
const studentFnr = args[0]

logger('info', ['utils', 'start-repack-students', 'persons', persons.length])
logger('info', ['utils', 'start-repack-students', 'we want person with fnr', studentFnr])

const student = persons.find(person => isStudent(person) && person.sourcedid.id === studentFnr)
logger('info', ['utils', 'start-repack-students', 'student found', student.name.fn])

const repacked = repackPerson(student)
console.log(repacked)

logger('info', ['utils', 'start-repack-students', 'finished'])
