const MongoClient = require('mongodb').MongoClient
const { logger } = require('@vtfk/logger')
const { MONGO: { CONNECTION, NAME } } = require('../config')

let client = null

module.exports = function getMongoDb (collection) {
  if (!CONNECTION) {
    logger('error', ['mongo', 'missing MONGODB_CONNECTION'])
    throw new Error('Missing env MONGODB_CONNECTION')
  }
  if (client && !client.isConnected) {
    client = null
    logger('info', ['mongo', 'discard client'])
  }
  if (client === null) {
    client = new MongoClient(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    logger('info', ['mongo', 'new client init'])
  } else if (client.isConnected) {
    logger('info', ['mongo', 'client connected', 'quick return', collection])
    if (collection) return client.db(NAME).collection(collection)
    else return client.db(NAME)
  }

  return new Promise((resolve, reject) => {
    client.connect(error => {
      if (error) {
        client = null
        logger('error', ['mongo', 'client error', error])
        return reject(error)
      } else {
        logger('info', ['mongo', 'new client connected', collection])
        if (collection) resolve(client.db(NAME).collection(collection))
        else resolve(client.db(NAME))
      }
    })
  })
}
