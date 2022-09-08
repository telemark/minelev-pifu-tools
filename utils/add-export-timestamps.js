(async () => {
  const { writeFile } = require('fs').promises
  const { logger } = require('@vtfk/logger')

  const updatedAt = new Date().toISOString()
  const data = require('../data/export.json')

  // Create data array for new data
  logger('info', ['utils', 'add-export-timestamps', data.length, 'objects', 'start'])

  data.forEach(obj => {
    obj.updatedAt = updatedAt
  })

  logger('info', ['utils', 'add-export-timestamps', data.length, 'objects', 'exporting'])
  await writeFile('data/export.json', JSON.stringify(data, null, 2), 'utf8')
  logger('info', ['utils', 'add-export-timestamps', data.length, 'objects', 'finished'])

  process.exit(0)
})()
