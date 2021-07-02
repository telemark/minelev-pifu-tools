(async () => {
  require('dotenv').config()
  const { writeFile } = require('fs').promises
  const { logger } = require('@vtfk/logger')
  const repackGroup = require('../lib/repack-group')
  const isUtdanningsprogram = require('../lib/is-utdanningsprogram')
  const groups = require('../data/groups.json')

  logger('info', ['utils', 'extract-groups-utdanningsprogrammer', 'groups', groups.length])
  const utdanningsprogrammer = groups.filter(isUtdanningsprogram)
  logger('info', ['utils', 'extract-groups-utdanningsprogrammer', 'utdanningsprogrammer', utdanningsprogrammer.length])
  await writeFile('data/utdanningsprogrammer.json', JSON.stringify(utdanningsprogrammer.map(repackGroup), null, 2), 'utf8')
  logger('info', ['utils', 'extract-groups-utdanningsprogrammer', 'finished'])
})()
