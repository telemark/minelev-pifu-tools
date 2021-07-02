(async () => {
  require('dotenv').config()
  const { writeFile } = require('fs').promises
  const { logger } = require('@vtfk/logger')
  const repackGroup = require('../lib/repack-group')
  const isProgramomraade = require('../lib/is-programomraade')
  const groups = require('../data/groups.json')

  logger('info', ['utils', 'extract-groups-programomraader', 'groups', groups.length])
  const programomraader = groups.filter(isProgramomraade)
  logger('info', ['utils', 'extract-groups-programomraader', 'programomraader', programomraader.length])
  await writeFile('data/programomraader.json', JSON.stringify(programomraader.map(repackGroup), null, 2), 'utf8')
  logger('info', ['utils', 'extract-groups-programomraader', 'finished'])
})()
