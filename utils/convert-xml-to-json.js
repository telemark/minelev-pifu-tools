(async () => {
  require('dotenv').config()
  const parser = require('fast-xml-parser')
  const { readFile, writeFile } = require('fs').promises
  const logger = require('../lib/logger')
  logger('info', ['utils', 'convert-xml-to-json', 'start'])
  const xmlFile = await readFile(process.env.PIFU_XML_FILE_PATH)
  const xml = xmlFile.toString()
  const options = {
    ignoreAttributes: false
  }
  logger('info', ['utils', 'convert-xml-to-json', 'converting'])
  const json = parser.parse(xml, options)
  logger('info', ['utils', 'convert-xml-to-json', 'writing to disk'])
  await writeFile('data/pifu.json', JSON.stringify(json, null, 2), 'utf-8')
  logger('info', ['utils', 'convert-xml-to-json', 'finished'])
})()
