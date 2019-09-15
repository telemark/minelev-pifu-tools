(async () => {
  const { writeFile } = require('fs').promises
  const logger = require('../lib/logger')
  const isFaggruppe = require('../lib/is-faggruppe')
  const repackGroup = require('../lib/repack-group')
  const groups = require('../data/groups.json')
  logger('info', ['utils', 'extract-groups-faggrupper', 'groups', groups.length])
  const faggrupper = groups.filter(isFaggruppe)
  logger('info', ['utils', 'extract-groups-faggrupper', 'faggrupper', faggrupper.length])
  await writeFile('data/faggrupper.json', JSON.stringify(faggrupper.map(repackGroup), null, 2), 'utf-8')
  logger('info', ['utils', 'extract-groups-faggrupper', 'finished'])
})()
