(async () => {
  const { writeFile } = require('fs').promises
  const logger = require('../lib/logger')
  const repackMembership = require('../lib/repack-membership')
  const pifu = require('../data/pifu.json')

  const memberships = pifu.enterprise.membership
  logger('info', ['utils', 'extract-memberships', 'memberships', memberships.length])
  await writeFile('data/memberships.json', JSON.stringify(memberships.map(repackMembership), null, 2), 'utf8')
  logger('info', ['utils', 'extract-memberships', 'finished'])
})()
