(async () => {
  const { writeFile } = require('fs').promises
  const isTeacher = require('../lib/is-teacher')
  const logger = require('../lib/logger')
  const repackPerson = require('../lib/repack-person')
  const persons = require('../data/persons.json')
  
  logger('info', ['utils', 'extract-persons-teachers', 'persons', persons.length])
  const teachers = persons.filter(isTeacher)
  logger('info', ['utils', 'extract-persons-teachers', 'teachers', teachers.length])
  await writeFile('data/teachers.json', JSON.stringify(teachers.map(repackPerson), null, 2), 'utf-8')
  logger('info', ['utils', 'extract-persons-teachers', 'finished'])
})()
