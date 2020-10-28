(async () => {
  require('dotenv').config()
  const { writeFile } = require('fs').promises
  const logger = require('../lib/logger')
  const config = require('../config')

  let data = []
  const skoleeier = require('../data/skoleeier.json')
  const skoler = require('../data/skoler.json')
  const basisgrupper = require('../data/basisgrupper.json')
  const faggrupper = require('../data/faggrupper.json')
  const kontaktlarergrupper = require('../data/kontaktlarergrupper.json')
  const undervisningsgrupper = require('../data/undervisningsgrupper.json')
  const utdanningsprogrammer = require('../data/utdanningsprogrammer.json')
  const programomraader = require('../data/programomraader.json')
  const students = require('../data/students.json')
  const teachers = require('../data/teachers.json')

  // Create data array for new data
  logger('info', ['utils', 'extract-export-data', 'creating data array for export'])

  data.push(...skoleeier)
  data.push(...skoler)
  data.push(...basisgrupper)
  data.push(...faggrupper)
  data.push(...kontaktlarergrupper)
  data.push(...undervisningsgrupper)
  data.push(...utdanningsprogrammer)
  data.push(...programomraader)
  data.push(...students)
  data.push(...teachers)

  logger('info', ['utils', 'extract-export-data', 'created data array', 'length', data.length])

  // Replace objects that should be manually handled (teachers thats students, and vica versa)
  if (config.OVERRIDE_FILE_PATH) {
    try {
      const overrideData = require(`${config.OVERRIDE_FILE_PATH[0] === '/' ? '' : '../'}${config.OVERRIDE_FILE_PATH}`)
      const overrideDataIds = overrideData.map(override => override.id)

      logger('info', ['utils', 'extract-export-data', 'imported override data objects', 'override length', overrideData.length])

      // Filter out data thats overridden
      data = data.filter(obj => !overrideDataIds.includes(obj.id))

      logger('info', ['utils', 'extract-export-data', 'removed old data objects', 'data length', data.length])

      // Add overridden data
      data.push(...overrideData)

      logger('info', ['utils', 'extract-export-data', 'added override data', 'data length', data.length])
    } catch (error) {
      logger('info', ['utils', 'extract-export-data', 'unable to import override file', config.OVERRIDE_FILE_PATH, error.message])
    }
  }

  logger('info', ['utils', 'extract-export-data', 'export data', data.length])
  await writeFile('data/export.json', JSON.stringify(data, null, 2), 'utf8')
  logger('info', ['utils', 'extract-export-data', 'finished'])

  process.exit(0)
})()
