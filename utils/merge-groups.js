(async () => {
  const { writeFile } = require('fs').promises
  const { logger } = require('@vtfk/logger')
  const data = []
  const skoler = require('../data/skoler.json')
  const basisgrupper = require('../data/basisgrupper.json')
  const kontaktlarergrupper = require('../data/kontaktlarergrupper.json')
  const undervisningsgrupper = require('../data/undervisningsgrupper.json')
  const utdanningsprogrammer = require('../data/utdanningsprogrammer.json')

  data.push(...skoler)
  data.push(...basisgrupper)
  data.push(...kontaktlarergrupper)
  data.push(...undervisningsgrupper)
  data.push(...utdanningsprogrammer)

  logger('info', ['utils', 'merge-groups', 'data', data.length])
  const merged = data.reduce((accumulator, current) => {
    accumulator[current.id] = current
    return accumulator
  }, {})
  await writeFile('data/merged-groups.json', JSON.stringify(merged, null, 2), 'utf8')
  logger('info', ['utils', 'merge-groups', 'finished'])
})()
