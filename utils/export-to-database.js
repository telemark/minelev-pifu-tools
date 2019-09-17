(async () => {
  require('dotenv').config()
  const sleep = require('then-sleep')
  const mongo = require('../lib/mongo')
  const logger = require('../lib/logger')
  const bulkSize = 10
  const sleepTime = 1000
  const db = await mongo()
  const dbName = process.env.MONGODB_NAME
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
  let tjommi = db.collection(dbCollection)

  data.push(...skoleeier)
  data.push(...skoler)
  data.push(...basisgrupper)
  data.push(...faggrupper)
  data.push(...kontaktlarergrupper)
  data.push(...undervisningsgrupper)
  data.push(...students)
  data.push(...teachers)

  // Drop existing collection
  try {
    logger('info', ['lib', 'export-to-database', 'drop collection'])
    await tjommi.drop()
  } catch (error) {
    logger('info', ['lib', 'export-to-database', 'drop collection', 'unable to drop', error])
  }

  // Create collection
  try {
    logger('info', ['lib', 'export-to-database', 'create collection'])
    await db.executeDbAdminCommand( { shardCollection: `${dbName}.${dbCollection}`, key: { _id: "hashed" } })
  } catch (error) {
    logger('info', ['lib', 'export-to-database', 'create collection', 'unable to create collection', error])
  }  

  tjommi = db.collection(dbCollection)

  // Insert data
  logger('info', ['lib', 'export-to-database', 'data', data.length, 'start'])
  while (data.length > 0) {
    const chunk = data.splice(0, bulkSize)
    logger('info', ['lib', 'export-to-database', 'chunk', chunk.length, 'ready'])
    const result = await tjommi.insertMany(chunk)
    logger('info', ['lib', 'export-to-database', 'chunk', 'inserted', result])
    logger('info', ['lib', 'export-to-database', 'data', data.length, 'remains'])
    await sleep(sleepTime)
  }
  
  logger('info', ['lib', 'export-to-database', 'finished'])
  process.exit(0)
})()
