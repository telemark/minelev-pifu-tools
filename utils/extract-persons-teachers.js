(async () => {
  const { writeFile } = require('fs').promises
  const isTeacher = require('../lib/is-teacher')
  const { logger } = require('@vtfk/logger')
  const repackPerson = require('../lib/repack-person')
  const persons = require('../data/persons.json')

  logger('info', ['utils', 'extract-persons-teachers', 'persons', persons.length])

  const teachers = persons.filter(isTeacher)
  logger('info', ['utils', 'extract-persons-teachers', 'teachers', teachers.length])

  const repacked = teachers.map(repackPerson)
  const unique = repacked.filter((teacher, index, array) => array.findIndex(t => (t.id === teacher.id)) === index)
  logger('info', ['utils', 'extract-persons-teachers', 'teachers', 'unique', unique.length])

  await writeFile('data/teachers.json', JSON.stringify(unique, null, 2), 'utf8')
  logger('info', ['utils', 'extract-persons-teachers', 'finished'])
})()
