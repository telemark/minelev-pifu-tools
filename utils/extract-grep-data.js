(async () => {
  const { get } = require('axios').default
  const { writeFile } = require('fs').promises
  const { logger } = require('@vtfk/logger')
  const { GREP } = require('../config')
  const repackUdirSparql = require('../lib/repack-udir-sparql')

  const extractGrepData = async (type, url, query) => {
    const requestHeaders = { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' }
    query = encodeURIComponent(query)

    try {
      logger('info', ['utils', 'extract-grep-data', type, 'get query'])
      const { data } = await get(`${url}?query=${query}`, { headers: requestHeaders })
      const sparqlData = data.results.bindings || []
      logger('info', ['utils', 'extract-grep-data', type, 'response', sparqlData.length])

      await writeFile(`data/grep-${type}.json`, JSON.stringify(sparqlData.map(repackUdirSparql), null, 2), 'utf8')
    } catch (error) {
      logger('error', ['utils', 'extract-grep-data', type, 'error', error.message])
    }
  }

  logger('info', ['utils', 'extract-grep-data', 'start'])

  await extractGrepData('fagkoder', GREP.SPARQL_URL, GREP.FAGKODER_QUERY)
  await extractGrepData('utdanningsprogram', GREP.SPARQL_URL, GREP.UTDANNINGSPROGRAM_QUERY)

  logger('info', ['utils', 'extract-grep-data', 'finished'])
})()
