(async () => {
  const { writeFile } = require('fs').promises
  const logger = require('../lib/logger')
  const pifu = require('../data/pifu.json')
  
  const groups = pifu.enterprise.group
  logger('info', ['utils', 'extract-groups', 'groups', groups.length])
  await writeFile('data/groups.json', JSON.stringify(groups, null, 2), 'utf-8')
  logger('info', ['utils', 'extract-groups', 'finished'])
})()
