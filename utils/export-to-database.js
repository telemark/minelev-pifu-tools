(async () => {
  require('dotenv').config()
  const { writeFile } = require('fs').promises
  const sleep = require('then-sleep')
  const mongo = require('../lib/mongo')
  const logger = require('../lib/logger')
  const compare = require('../lib/compare-arrays')
  const RU = process.env.MONGODB_COSMOS_RUS // RU limit in Azure
  const sleepTime = 1000
  const db = await mongo()
  const dbName = process.env.MONGODB_NAME
  const dbCollection = process.env.MONGODB_COLLECTION
  const data = []
  const oldData = []
  const skoleeier = require('../data/skoleeier.json')
  const skoler = require('../data/skoler.json')
  const basisgrupper = require('../data/basisgrupper.json')
  const faggrupper = require('../data/faggrupper.json')
  const kontaktlarergrupper = require('../data/kontaktlarergrupper.json')
  const undervisningsgrupper = require('../data/undervisningsgrupper.json')
  const students = require('../data/students.json')
  const teachers = require('../data/teachers.json')
  let tjommi = db.collection(dbCollection)

  const payloadLimit = RU * 30
  const getPayloadSize = payload => {
    return Buffer.byteLength(JSON.stringify(payload))
  }

  // Import old data
  try {
    logger('info', ['lib', 'export-to-database', 'import old export'])
    oldData.push(...require('../data/export.json'))
    logger('info', ['lib', 'export-to-database', 'imported', oldData.length])
  } catch (error) {
    logger('warn', ['lib', 'export-to-database', 'unable to read old export'])
  }

  // Create data array for new data
  data.push(...skoleeier)
  data.push(...skoler)
  data.push(...basisgrupper)
  data.push(...faggrupper)
  data.push(...kontaktlarergrupper)
  data.push(...undervisningsgrupper)
  data.push(...students)
  data.push(...teachers)

  // Compare old data with new data to see what we need to do.
  const { add, remove, updates } = compare(oldData, data)

  // If we are supposed to add everything, drop existing collection so we can start with clean sheets
  if (add.length === data.length) {
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
      await db.executeDbAdminCommand({ shardCollection: `${dbName}.${dbCollection}`, key: { _id: 'hashed' } })
    } catch (error) {
      logger('info', ['lib', 'export-to-database', 'create collection', 'unable to create collection', error])
    }
  }

  tjommi = db.collection(dbCollection)

  // Remove whats supposed to be removed
  logger('info', ['lib', 'export-to-database', 'remove data', remove.length, 'start'])
  while (remove.length > 0) {
    const payload = []
    while (getPayloadSize(payload) < payloadLimit && remove.length > 0) {
      const item = remove.pop()
      payload.push(item)
    }
    if (payload.length > 1) {
      const bonus = payload.pop()
      remove.push(bonus)
    }

    const queryObjects = payload.map(obj => {
      return { id: obj.id, type: obj.type }
    })

    logger('info', ['lib', 'export-to-database', 'payloads', queryObjects.length, 'ready'])

    const result = await tjommi.deleteMany({ $or: [...queryObjects] })

    logger('info', ['lib', 'export-to-database', 'payload', 'removed', result])
    logger('info', ['lib', 'export-to-database', 'remove data', remove.length, 'remains'])
    await sleep(sleepTime)
  }

  // Update whats been changed
  logger('info', ['lib', 'export-to-database', 'update data', updates.length, 'start'])

  while (updates.length > 0) {
    const payload = []
    while (getPayloadSize(payload) < payloadLimit && updates.length > 0) {
      const item = updates.pop()
      payload.push(item)
    }
    if (payload.length > 1) {
      const bonus = payload.pop()
      updates.push(bonus)
    }

    logger('info', ['lib', 'export-to-database', 'payloads', payload.length, 'ready'])

    // Loop the payload and replace record.
    await Promise.all(payload.forEach(async (obj) => {
      const result = await tjommi.findOneAndReplace({ id: obj.id, type: obj.type }, obj)
      logger('info', ['lib', 'export-to-database', 'payload', 'updated', obj.type, result])
    }))

    logger('info', ['lib', 'export-to-database', 'update data', updates.length, 'remains'])
    await sleep(sleepTime)
  }

  // Insert new items
  logger('info', ['lib', 'export-to-database', 'insert data', data.length, 'start'])
  while (add.length > 0) {
    const payload = []
    while (getPayloadSize(payload) < payloadLimit && data.length > 0) {
      const item = add.pop()
      payload.push(item)
    }
    if (payload.length > 1) {
      const bonus = payload.pop()
      add.push(bonus)
    }

    logger('info', ['lib', 'export-to-database', 'payloads', payload.length, 'ready'])
    const result = await tjommi.insertMany(payload)
    logger('info', ['lib', 'export-to-database', 'payload', 'inserted', result])
    logger('info', ['lib', 'export-to-database', 'insert data', add.length, 'remains'])
    await sleep(sleepTime)
  }

  // Export data dump
  logger('info', ['utils', 'export-to-database', 'export file', data.length])
  await writeFile('../data/export.json', JSON.stringify(data, null, 2), 'utf-8')
  logger('info', ['utils', 'export-to-database', 'export file', 'finished'])

  logger('info', ['lib', 'export-to-database', 'finished'])
  process.exit(0)
})()
