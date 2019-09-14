(async () => {
  require('dotenv').config()
  const parser = require('fast-xml-parser')
  const { readFile, writeFile } = require('fs').promises
  const logger = require('../lib/logger')
  const xmlFilePath = `${process.env.PIFU_XML_FILE_PATH}`
  const jsonFileName = `${process.env.DATA_DIRECTORY_PATH}/pifu.json`
  const xmlFile = await readFile(xmlFilePath)
  const xml = xmlFile.toString()
  const options = {
    ignoreAttributes: false
  }
  const json = parser.parse(xml, options)
  await writeFile(jsonFileName, JSON.stringify(json, null, 2), 'utf-8')
  logger('info', ['utils', 'convert-xml-to-json', 'finished'])
})()
