(async () => {
  require('dotenv').config()
  const { writeFile } = require('fs').promises
  const logger = require('../lib/logger')

  const data = []
  const skoleeier = require('../data/skoleeier.json')
  const skoler = require('../data/skoler.json')
  const basisgrupper = require('../data/basisgrupper.json')
  const faggrupper = require('../data/faggrupper.json')
  const kontaktlarergrupper = require('../data/kontaktlarergrupper.json')
  const undervisningsgrupper = require('../data/undervisningsgrupper.json')
  const students = require('../data/students.json')
  const teachers = require('../data/teachers.json')

  // Create data array for new data
  data.push(...skoleeier)
  data.push(...skoler)
  data.push(...basisgrupper)
  data.push(...faggrupper)
  data.push(...kontaktlarergrupper)
  data.push(...undervisningsgrupper)
  data.push(...students)
  data.push(...teachers)

  // Export data dump
  logger('info', ['utils', 'export-to-database', 'export file', data.length])
  await writeFile('data/export.json', JSON.stringify(data, null, 2), 'utf8')
  logger('info', ['utils', 'export-to-database', 'export file', 'finished'])

  logger('info', ['lib', 'export-to-database', 'finished'])
  process.exit(0)
})()
