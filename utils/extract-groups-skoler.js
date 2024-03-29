(async () => {
  const { writeFile } = require('fs').promises
  const { logger } = require('@vtfk/logger')
  const isSkole = require('../lib/is-skole')
  const repackSchool = require('../lib/repack-school')
  const groups = require('../data/groups.json')

  logger('info', ['utils', 'extract-groups-skoler', 'groups', groups.length])
  const skoler = groups.filter(isSkole)
  logger('info', ['utils', 'extract-groups-skoler', 'skoler', skoler.length])
  await writeFile('data/skoler.json', JSON.stringify(skoler.map(repackSchool), null, 2), 'utf8')
  logger('info', ['utils', 'extract-groups-skoler', 'finished'])
})()
