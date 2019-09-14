(async () => {
  const { writeFile } = require('fs').promises
  const logger = require('../lib/logger')
  const isSkole = require('../lib/is-skole')
  const groups = require('../data/groups.json')
  logger('info', ['utils', 'extract-groups-skoler', 'groups', groups.length])
  const skoler = groups.filter(isSkole)
  logger('info', ['utils', 'extract-groups-skoler', 'skoler', skoler.length])
  await writeFile('data/skoler.json', JSON.stringify(skoler, null, 2), 'utf-8')
  logger('info', ['utils', 'extract-groups-skoler', 'finished'])
})()
