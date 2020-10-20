(async () => {
  require('dotenv').config()
  const mongo = require('../lib/mongo')
  const logger = require('../lib/logger')
  const db = await mongo()
  const dbCollection = process.env.MONGODB_COLLECTION
  const tjommi = db.collection(dbCollection)

  // Create data array for new data
  const data = require('../data/export.json')

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
