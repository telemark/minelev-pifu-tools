(async () => {
  const { writeFile } = require('fs').promises
  const isStudent = require('../lib/is-student')
  const persons = require('../data/persons.json')
  const logger = require('../lib/logger')
  const repackPerson = require('../lib/repack-person')

  logger('info', ['utils', 'extract-persons-students', 'persons', persons.length])
  const students = persons.filter(isStudent)
  logger('info', ['utils', 'extract-persons-students', 'students', students.length])
  await writeFile('data/students.json', JSON.stringify(students.map(repackPerson), null, 2), 'utf-8')
  logger('info', ['utils', 'extract-persons-students', 'finished'])
})()
