const { logger } = require('@vtfk/logger')
const axios = require('axios').default
const { writeFile } = require('fs').promises
const { VIS: { USE_AUTH, USERNAME: username, PASSWORD: password } } = require('../config')

module.exports = async ({ name, url }) => {
  try {
    logger('info', ['get-vis-files', name, 'downloading'])
    const options = USE_AUTH ? { auth: { username, password } } : undefined
    const { data } = await axios.get(url, options)
    logger('info', ['get-vis-files', name, 'downloaded', data.length, `${name.replace('.json', '')}`])
    await writeFile(`data/${name}`, JSON.stringify(data, null, 2), 'utf8')
    return true
  } catch (error) {
    console.log('ERROR:', error.message)
    logger('error', ['get-vis-files', name, error])
    return false
  }
}
