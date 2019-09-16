(async () => {
  const { writeFile } = require('fs').promises
  const logger = require('../lib/logger')
  const data = []
  const skoleeier = require('../data/skoleeier.json')
  const skoler = require('../data/skoler.json')
  const basisgrupper = require('../data/basisgrupper.json')
  const faggrupper = require('../data/faggrupper.json')
  const kontaktlarergrupper = require('../data/kontaktlarergrupper.json')
  const undervisningsgrupper = require('../data/undervisningsgrupper.json')
  data.push(...skoleeier)
  data.push(...skoler)
  data.push(...basisgrupper)
  data.push(...faggrupper)
  data.push(...kontaktlarergrupper)
  data.push(...undervisningsgrupper)
  logger('info', ['utils', 'merge-groups', 'data', data.length])
  const merged = data.reduce((accumulator, current) => {
    accumulator[current.id] = current
    return accumulator
  }, {})
  await writeFile('data/merged-groups.json', JSON.stringify(merged, null, 2), 'utf-8')
  logger('info', ['utils', 'merge-groups', 'finished'])
})()
