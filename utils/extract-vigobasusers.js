(async () => {
  const { writeFile } = require('fs').promises
  const logger = require('../lib/logger')
  const vigobasUsers = await require('../lib/get-users-from-vigobas')()

  logger('info', ['utils', 'extract-vigobasuser', 'length', vigobasUsers.length])
  await writeFile('data/vigobasUsers.json', JSON.stringify(vigobasUsers, null, 2), 'utf-8')
  logger('info', ['utils', 'extract-vigobasuser', 'finished'])
})()
