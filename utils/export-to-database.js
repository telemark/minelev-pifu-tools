(async () => {
  require('dotenv').config()
  const sleep = require('then-sleep')
  const mongo = require('../lib/mongo')
  const logger = require('../lib/logger')
  const bulkSize = 25
  const db = await mongo()
  const tjommi = db.collection(process.env.MONGODB_COLLECTION)
  const data = []
  const skoler = require('../data/skoler.json')
  const basisgrupper = require('../data/basisgrupper.json')
  const faggrupper = require('../data/faggrupper.json')
  const kontaktlarergrupper = require('../data/kontaktlarergrupper.json')
  const undervisningsgrupper = require('../data/undervisningsgrupper.json')
  const students = require('../data/students.json')
  const teachers = require('../data/teachers.json')
  data.push(...skoler)
  data.push(...basisgrupper)
  data.push(...faggrupper)
  data.push(...kontaktlarergrupper)
  data.push(...undervisningsgrupper)
  data.push(...students)
  data.push(...teachers)
  logger('info', ['lib', 'export-to-data-base', 'data', data.length, 'start'])
  while (data.length > 0) {
    const chunk = data.splice(0, bulkSize)
    logger('info', ['lib', 'export-to-data-base', 'chunk', chunk.length, 'ready'])
    const result = await tjommi.insertMany(chunk)
    logger('info', ['lib', 'export-to-data-base', 'chunk', 'inserted', result])
    logger('info', ['lib', 'export-to-data-base', 'data', data.length, 'remains'])
    await sleep(1000)
  }
  logger('info', ['lib', 'export-to-data-base', 'finished'])
  process.exit(0)
})()
