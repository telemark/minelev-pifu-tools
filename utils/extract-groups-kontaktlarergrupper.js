(async () => {
  const { writeFile } = require('fs').promises
  const logger = require('../lib/logger')
  const isKontaktlarergruppe = require('../lib/is-undervisningsgruppe')
  const groups = require('../data/groups.json')
  logger('info', ['utils', 'extract-groups-kontaktlarergrupper', 'groups', groups.length])
  const kontaktlarergrupper = groups.filter(isKontaktlarergruppe)
  logger('info', ['utils', 'extract-groups-kontaktlarergrupper', 'kontaktlarergrupper', kontaktlarergrupper.length])
  await writeFile('data/kontaktlarergrupper.json', JSON.stringify(kontaktlarergrupper, null, 2), 'utf-8')
  logger('info', ['utils', 'extract-groups-kontaktlarergrupper', 'finished'])
})()
