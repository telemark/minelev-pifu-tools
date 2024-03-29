(async () => {
  require('dotenv').config()
  const { writeFile } = require('fs').promises
  const { logger } = require('@vtfk/logger')
  const isUndervisningsgruppe = require('../lib/is-undervisningsgruppe')
  const repackGroup = require('../lib/repack-group')
  const groups = require('../data/groups.json')

  logger('info', ['utils', 'extract-groups-undervisningsgrupper', 'groups', groups.length])
  const undervisningsgrupper = groups.filter(isUndervisningsgruppe)
  logger('info', ['utils', 'extract-groups-undervisningsgrupper', 'undervisningsgrupper', undervisningsgrupper.length])
  await writeFile('data/undervisningsgrupper.json', JSON.stringify(undervisningsgrupper.map(repackGroup), null, 2), 'utf8')
  logger('info', ['utils', 'extract-groups-undervisningsgrupper', 'finished'])
})()
