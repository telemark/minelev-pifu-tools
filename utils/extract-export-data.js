(async () => {
  const { writeFile } = require('fs').promises
  const { logger } = require('@vtfk/logger')

  const data = []
  const skoler = require('../data/skoler.json')
  const basisgrupper = require('../data/basisgrupper.json')
  const kontaktlarergrupper = require('../data/kontaktlarergrupper.json')
  const undervisningsgrupper = require('../data/undervisningsgrupper.json')
  const utdanningsprogrammer = require('../data/utdanningsprogrammer.json')
  const programomraader = require('../data/programomraader.json')
  const students = require('../data/students.json')
  const teachers = require('../data/teachers.json')

  // Create data array for new data
  logger('info', ['utils', 'extract-export-data', 'creating data array for export'])

  data.push(...skoler)
  data.push(...basisgrupper)
  data.push(...kontaktlarergrupper)
  data.push(...undervisningsgrupper)
  data.push(...utdanningsprogrammer)
  data.push(...programomraader)
  data.push(...students)
  data.push(...teachers)

  logger('info', ['utils', 'extract-export-data', 'export data', data.length])
  await writeFile('data/export.json', JSON.stringify(data, null, 2), 'utf8')
  logger('info', ['utils', 'extract-export-data', 'finished'])

  process.exit(0)
})()
