(async () => {
  const { writeFile } = require('fs').promises
  const logger = require('../lib/logger')
  const isTrinn = require('../lib/is-trinn')
  const repackGroup = require('../lib/repack-group')
  const groups = require('../data/groups.json')

  logger('info', ['utils', 'extract-groups-trinn', 'groups', groups.length])
  const trinn = groups.filter(isTrinn)
  logger('info', ['utils', 'extract-groups-trinn', 'trinn', trinn.length])
  await writeFile('data/trinn.json', JSON.stringify(trinn.map(repackGroup), null, 2), 'utf8')
  logger('info', ['utils', 'extract-groups-trinn', 'finished'])
})()
