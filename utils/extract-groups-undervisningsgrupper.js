(async () => {
  const { writeFile } = require('fs').promises
  const logger = require('../lib/logger')
  const isUndervisningsgruppe = require('../lib/is-undervisningsgruppe')
  const groups = require('../data/groups.json')
  logger('info', ['utils', 'extract-groups-undervisningsgrupper', 'groups', groups.length])
  const undervisningsgrupper = groups.filter(isUndervisningsgruppe)
  logger('info', ['utils', 'extract-groups-undervisningsgrupper', 'undervisningsgrupper', undervisningsgrupper.length])
  await writeFile('data/undervisningsgrupper.json', JSON.stringify(undervisningsgrupper, null, 2), 'utf-8')
  logger('info', ['utils', 'extract-groups-undervisningsgrupper', 'finished'])
})()
