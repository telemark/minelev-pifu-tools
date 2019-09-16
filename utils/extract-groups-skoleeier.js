(async () => {
  const { writeFile } = require('fs').promises
  const logger = require('../lib/logger')
  const isSkoleeier = require('../lib/is-skoleeier')
  const repackSkoleeier = require('../lib/repack-group-skoleeier')
  const groups = require('../data/groups.json')

  logger('info', ['utils', 'extract-groups-skoleeier', 'groups', groups.length])
  const skoleeier = groups.filter(isSkoleeier)
  logger('info', ['utils', 'extract-groups-skoleeier', 'skoleeier', skoleeier.length])
  await writeFile('data/skoleeier.json', JSON.stringify(skoleeier.map(repackSkoleeier), null, 2), 'utf-8')
  logger('info', ['utils', 'extract-groups-skoleeier', 'finished'])
})()
