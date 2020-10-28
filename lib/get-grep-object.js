const logger = require('./logger')

module.exports = (groupType, uuid) => {
  const grepdata = []

  // Load data based on type
  if (['fag', 'undervisningsgruppe'].includes(groupType)) {
    grepdata.push(...(require('../data/grep-fagkoder.json')))
  } else if (groupType === 'programområde') {
    grepdata.push(...(require('../data/grep-programomraader.json')))
  } else if (groupType === 'utdanningsprogram') {
    grepdata.push(...(require('../data/grep-utdanningsprogram.json')))
  } else {
    logger('info', ['get-grep-object', 'Unknown groupType', groupType])
    return null
  }

  // return first match based on id/guid field
  const matches = grepdata.filter(obj => obj.id === uuid)
  return matches && matches.length >= 0 ? matches[0] : null
}
