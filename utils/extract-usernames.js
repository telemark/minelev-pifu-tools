(async () => {
  const { writeFile } = require('fs').promises
  const logger = require('../lib/logger')
  const usernames = await require('../lib/get-usernames-from-vigobas')()

  logger('info', ['utils', 'extract-usernames', 'usernames', usernames.length])
  await writeFile('data/usernames.json', JSON.stringify(usernames, null, 2), 'utf-8')
  logger('info', ['utils', 'extract-usernames', 'finished'])
})()
