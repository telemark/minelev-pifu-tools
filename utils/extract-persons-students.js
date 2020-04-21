(async () => {
  const { writeFile } = require('fs').promises
  const isStudent = require('../lib/is-student')
  const persons = require('../data/persons.json')
  const logger = require('../lib/logger')
  const repackPerson = require('../lib/repack-person')

  logger('info', ['utils', 'extract-persons-students', 'persons', persons.length])

  const students = persons.filter(isStudent)
  logger('info', ['utils', 'extract-persons-students', 'students', students.length])

  const repacked = students.map(repackPerson)
  const unique = repacked.filter((student, index, array) => array.findIndex(t => (t.id === student.id)) === index)
  logger('info', ['utils', 'extract-persons-students', 'students', 'unique', unique.length])

  await writeFile('data/students.json', JSON.stringify(unique, null, 2), 'utf-8')
  logger('info', ['utils', 'extract-persons-students', 'finished'])
})()
