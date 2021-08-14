(async () => {
  require('dotenv').config()
  const { logger } = require('@vtfk/logger')
  const { VIS_URLS } = require('../config')
  const getVisFile = require('../lib/get-vis-file')

  logger('info', ['utils', 'get-vis-files', 'starter filhenting'])
  await Promise.all(VIS_URLS.map(getVisFile))
  logger('info', ['utils', 'get-vis-files', 'filhenting ferdig'])
})()
