(async () => {
  const { writeFile } = require('fs').promises
  const pifu = require('./data/pifu.json')
  const groups = pifu.enterprise.group
  console.log(`Got ${groups.length} groups`)
  await writeFile('data/groups.json', JSON.stringify(groups, null, 2), 'utf-8')
  console.log('finished')
})()
