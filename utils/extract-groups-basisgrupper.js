(async () => {
  const { writeFile } = require('fs').promises
  const logger = require('../lib/logger')
  const isBasisgruppe = require('../lib/is-basisgruppe')
  const groups = require('../data/groups.json')
  logger('info', ['utils', 'extract-groups-basisgrupper', 'groups', groups.length])
  const basisgrupper = groups.filter(isBasisgruppe)
  logger('info', ['utils', 'extract-groups-basisgrupper', 'basisgrupper', basisgrupper.length])
  await writeFile('data/basisgrupper.json', JSON.stringify(basisgrupper, null, 2), 'utf-8')
  logger('info', ['utils', 'extract-groups-basisgrupper', 'finished'])
})()
