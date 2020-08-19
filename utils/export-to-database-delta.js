(async () => {
  require('dotenv').config()
  const { writeFile } = require('fs').promises
  const mongo = require('../lib/mongo')
  const logger = require('../lib/logger')
  const compare = require('../lib/compare-arrays')
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
  const oldData = []

  // Create data array for new data
  data.push(...skoleeier)
  data.push(...skoler)
  data.push(...basisgrupper)
  data.push(...faggrupper)
  data.push(...kontaktlarergrupper)
  data.push(...undervisningsgrupper)
  data.push(...students)
  data.push(...teachers)

  // Import old data
  try {
    logger('info', ['lib', 'export-to-database-delta', 'get old data'])
    oldData.concat(await tjommi.find({}).toArray())
    logger('info', ['lib', 'export-to-database-delta', 'get old data', 'found length', oldData.length])
  } catch (error) {
    logger('warn', ['lib', 'export-to-database-delta', 'get old data', 'unable to get old data from mongo collection'])
    console.log(error)
  }

  // Compare old data with new data to see what we need to do.
  const { add, remove, update } = compare(oldData, data, true)

  // If we are supposed to add everything, drop existing collection so we can start with clean sheets
  if (add.length === data.length) {
    try {
      logger('info', ['lib', 'export-to-database-delta', 'clear collection'])
      await tjommi.remove({})
    } catch (error) {
      logger('info', ['lib', 'export-to-database-delta', 'unable to clear collection', error])
    }
  }

  // Remove whats updated or supposed to be removed
  if (remove.length > 0) {
    logger('info', ['lib', 'export-to-database-delta', 'remove data', remove.length, 'start'])
    try {
      const queryObjects = remove.map(obj => {
        return { id: obj.id, type: obj.type }
      })

      logger('info', ['lib', 'export-to-database-delta', 'payloads', queryObjects.length, 'ready'])
      const result = await tjommi.deleteMany({ $or: [...queryObjects] })
      logger('info', ['lib', 'export-to-database-delta', 'payload', 'removed', result])
    } catch (error) {
      logger('error', ['lib', 'export-to-database-delta', 'remove data', 'failed to remove data', error])
    }
  }

  // Update updated data
  logger('info', ['lib', 'export-to-database-delta', 'update data', update.length, 'start'])
  while (update.length > 0) {
    const obj = update.pop()

    try {
      const result = await tjommi.findOneAndReplace({ id: obj.id, type: obj.type }, obj)
      logger('info', ['lib', 'export-to-database-delta', 'update data', 'updated', result])
    } catch (error) {
      logger('warn', ['lib', 'export-to-database-delta', 'update data', 'unable to update - retrying', error])
      update.push(obj)
    }

    logger('info', ['lib', 'export-to-database-delta', 'update data', update.length, 'remains'])
  }

  // Insert new items
  if (add.length > 0) {
    logger('info', ['lib', 'export-to-database-delta', 'insert data', add.length, 'start'])
    try {
      const result = await tjommi.insertMany(add)
      logger('info', ['lib', 'export-to-database-delta', 'insert data', 'inserted', result])
    } catch (error) {
      logger('error', ['lib', 'export-to-database-delta', 'update data', 'failed to insert data', error])
    }
  }

  logger('info', ['lib', 'export-to-database-delta', 'finished'])
  process.exit(0)
})()
