(async () => {
  const { writeFile } = require('fs').promises
  const logger = require('../lib/logger')
  const pifu = require('../data/pifu.json')
  const persons = pifu.enterprise.person

  logger('info', ['utils', 'extract-persons', 'persons', persons.length])
  await writeFile('data/persons.json', JSON.stringify(persons, null, 2), 'utf-8')
  logger('info', ['utils', 'extract-persons', 'finished'])
})()
