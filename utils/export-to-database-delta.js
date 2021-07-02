(async () => {
  require('dotenv').config()
  const mongo = require('../lib/mongo')
  const { logger } = require('@vtfk/logger')
  const compare = require('../lib/compare-arrays')
  const tjommi = await mongo()

  let oldData = []

  // Import export data
  const data = require('../data/export.json')

  // Import old data
  try {
    logger('info', ['lib', 'export-to-database-delta', 'get old data'])
    oldData = await tjommi.find({}).toArray()
    logger('info', ['lib', 'export-to-database-delta', 'get old data', 'found length', oldData.length])
  } catch (error) {
    logger('warn', ['lib', 'export-to-database-delta', 'get old data', 'unable to get old data from mongo collection', error])
  }

  if (!oldData || oldData.length === 0) {
    logger('error', ['lib', 'export-to-database-delta', 'unable to get old data', 'length', oldData.length])
    throw new Error('Unable to get old data from database. Run full sync if this is the first sync in this database.')
  }

  // Compare old data with new data to see what we need to do.
  const { add, remove, update } = compare(oldData, data, true)

  // If we are supposed to add everything, drop existing collection so we can start with clean sheets
  if (add.length === data.length) {
    try {
      logger('info', ['lib', 'export-to-database-delta', 'clear collection'])
      await tjommi.deleteMany({})
    } catch (error) {
      logger('warn', ['lib', 'export-to-database-delta', 'unable to clear collection', error])
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
      logger('info', ['lib', 'export-to-database-delta', 'payload', 'removed', result.deletedCount])
    } catch (error) {
      logger('error', ['lib', 'export-to-database-delta', 'remove data', 'failed to remove data', error])
    }
  }

  // Update updated data
  if (update.length > 0) {
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
  }

  // Insert new items
  if (add.length > 0) {
    logger('info', ['lib', 'export-to-database-delta', 'insert data', add.length, 'start'])
    try {
      const result = await tjommi.insertMany(add)
      logger('info', ['lib', 'export-to-database-delta', 'insert data', 'inserted', result.insertedCount])
    } catch (error) {
      logger('error', ['lib', 'export-to-database-delta', 'update data', 'failed to insert data', error])
    }
  }

  logger('info', ['lib', 'export-to-database-delta', 'finished'])
  process.exit(0)
})()
