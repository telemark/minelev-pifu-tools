(async () => {
  require('dotenv').config()
  const { writeFile } = require('fs').promises

  const convertXml = require('../lib/convert-xml-to-json')
  const mergeEnterprises = require('../lib/merge-enterprises')
  const logger = require('../lib/logger')
  const config = require('../config')

  logger('info', ['utils', 'convert-xml-to-json', 'start'])

  const files = await Promise.all(config.PIFU_FILES.map(convertXml))
  const enterprises = files.map(file => file.enterprise)

  logger('info', ['utils', 'convert-xml-to-json', 'merging'])
  const merged = mergeEnterprises(enterprises)

  logger('info', ['utils', 'convert-xml-to-json', 'writing to disk'])
  await writeFile('data/pifu.json', JSON.stringify(merged, null, 2), 'utf-8')

  logger('info', ['utils', 'convert-xml-to-json', 'finished'])
})()
