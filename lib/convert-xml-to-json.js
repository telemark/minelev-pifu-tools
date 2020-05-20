const { readFile } = require('fs').promises
const parser = require('fast-xml-parser')

const logger = require('./logger')

module.exports = async (PIFU_FILE) => {
  logger('info', ['lib', 'convert-xml-to-json', PIFU_FILE, 'reading file'])
  const xmlFile = await readFile(PIFU_FILE)
  const xml = xmlFile.toString()

  logger('info', ['lib', 'convert-xml-to-json', PIFU_FILE, 'converting'])
  const json = parser.parse(xml, { ignoreAttributes: false })

  logger('info', ['lib', 'convert-xml-to-json', PIFU_FILE, 'converted'])
  return json
}
