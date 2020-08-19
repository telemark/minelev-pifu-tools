(async () => {
  require('dotenv').config()
  const { writeFile } = require('fs').promises
  const mongo = require('../lib/mongo')
  const logger = require('../lib/logger')
  const db = await mongo()
  const dbCollection = process.env.MONGODB_COLLECTION
  const data = []
  const skoleeier = require('../data/skoleeier.json')
  const skoler = require('../data/skoler.json')
  const basisgrupper = require('../data/basisgrupper.json')
  const faggrupper = require('../data/faggrupper.json')
  const kontaktlarergrupper = require('../data/kontaktlarergrupper.json')
  const undervisningsgrupper = require('../data/undervisningsgrupper.json')
  const students = require('../data/students.json')
  const teachers = require('../data/teachers.json')
  const tjommi = db.collection(dbCollection)

  // Create data array for new data
  data.push(...skoleeier)
  data.push(...skoler)
  data.push(...basisgrupper)
  data.push(...faggrupper)
  data.push(...kontaktlarergrupper)
  data.push(...undervisningsgrupper)
  data.push(...students)
  data.push(...teachers)

  // If we are supposed to add everything, drop existing collection so we can start with clean sheets
  try {
    logger('info', ['lib', 'export-to-database-full', 'clear collection'])
    await tjommi.remove({})
  } catch (error) {
    logger('info', ['lib', 'export-to-database-full', 'unable to clear collection', error])
  }

  logger('info', ['lib', 'export-to-database-full', 'insert data', data.length, 'start'])
  try {
    const result = await tjommi.insertMany(data)
    logger('info', ['lib', 'export-to-database-full', 'insert data', 'inserted', result])
  } catch (error) {
    logger('error', ['lib', 'export-to-database-full', 'update data', 'failed to insert data', error])
  }

  logger('info', ['lib', 'export-to-database-full', 'finished'])
  process.exit(0)
})()
