(async () => {
  require('dotenv').config()
  const { MONGO: { COLLECTION, COLLECTION_PREV, COLLECTION_TEMP } } = require('../config')
  const yargs = require('yargs')
  const { hideBin } = require('yargs/helpers')
  const { logger } = require('@vtfk/logger')
  const tjommi = await require('../lib/mongo')(COLLECTION)

  const { rename } = yargs(hideBin(process.argv)).argv

  // Create data array for new data
  const data = require('../data/export.json')

  if (!rename) {
    // If we are supposed to add everything, drop existing collection so we can start with clean sheets
    try {
      logger('info', ['lib', 'export-to-database-full', 'clear collection'])
      await tjommi.deleteMany({})
    } catch (error) {
      logger('warn', ['lib', 'export-to-database-full', 'unable to clear collection', error])
    }

    // add data to collection
    logger('info', ['lib', 'export-to-database-full', 'insert data', data.length, 'start'])
    try {
      const result = await tjommi.insertMany(data)
      logger('info', ['lib', 'export-to-database-full', 'insert data', 'inserted', result.insertedCount])
    } catch (error) {
      logger('error', ['lib', 'export-to-database-full', 'update data', 'failed to insert data', error])
    }

    logger('info', ['lib', 'export-to-database-full', 'finished'])
  } else {
    let tjommiTemp = await require('../lib/mongo')()
    try {
      logger('info', ['lib', 'export-to-database-full', 'rename', `create ${COLLECTION_TEMP}`])
      await tjommiTemp.createCollection(COLLECTION_TEMP)
      tjommiTemp = await require('../lib/mongo')(COLLECTION_TEMP)
    } catch (error) {
      logger('warn', ['lib', 'export-to-database-full', 'rename', `failed to create collection ${COLLECTION_TEMP}`, error])
      process.exit(-1)
    }

    // If we are supposed to add new data to a temp collection, drop existing pifu-previous
    const tjommiPrev = await require('../lib/mongo')(COLLECTION_PREV)
    try {
      logger('info', ['lib', 'export-to-database-full', 'rename', `drop ${COLLECTION_PREV}`])
      await tjommiPrev.drop()
    } catch (error) {
      logger('warn', ['lib', 'export-to-database-full', 'rename', `unable to drop collection ${COLLECTION_PREV}`, error])
      process.exit(-1)
    }

    // add data to collection
    try {
      logger('info', ['lib', 'export-to-database-full', 'rename', `insert data to ${COLLECTION_TEMP}`, data.length, 'start'])
      const result = await tjommiTemp.insertMany(data)
      logger('info', ['lib', 'export-to-database-full', 'rename', `insert data to ${COLLECTION_TEMP}`, 'inserted', result.insertedCount])
    } catch (error) {
      logger('error', ['lib', 'export-to-database-full', 'rename', 'update data', `failed to insert data to ${COLLECTION_TEMP}`, error])
      process.exit(-1)
    }

    // If we have added new data to a temp collection, rename existing pifu collection to 'pifu_previous'
    try {
      logger('info', ['lib', 'export-to-database-full', 'rename', `renaming ${COLLECTION} to ${COLLECTION_PREV}`])
      await tjommi.rename(COLLECTION_PREV)
    } catch (error) {
      logger('warn', ['lib', 'export-to-database-full', 'rename', `unable to rename ${COLLECTION} to ${COLLECTION_PREV}`, error])
      process.exit(-1)
    }

    // If we have added new data to a temp collection, rename existing pifu-temp collection to 'pifu'
    try {
      logger('info', ['lib', 'export-to-database-full', 'rename', `renaming ${COLLECTION_TEMP} to ${COLLECTION}`])
      await tjommiTemp.rename(COLLECTION)
    } catch (error) {
      logger('warn', ['lib', 'export-to-database-full', 'rename', `unable to rename ${COLLECTION_TEMP} to ${COLLECTION}`, error])
      process.exit(-1)
    }

    logger('info', ['lib', 'export-to-database-full', 'rename', 'finished'])
  }

  process.exit(0)
})()
