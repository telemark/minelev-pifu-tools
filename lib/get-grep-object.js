const logger = require('./logger')

module.exports = (groupType, groupId, grepUUID) => {
  const grepdata = []

  // Load data based on type
  if (['fag', 'undervisningsgruppe'].includes(groupType)) {
    grepdata.push(...(require('../data/grep-fagkoder.json')))
  } else if (groupType === 'programområde') {
    grepdata.push(...(require('../data/grep-programomraader.json')))
  } else if (groupType === 'utdanningsprogram') {
    grepdata.push(...(require('../data/grep-utdanningsprogram.json')))
  } else {
    return null
  }

  if (grepUUID) {
    // if grepUUID is sent, return first match based on id/guid field
    const matches = grepdata.filter(obj => obj.id === grepUUID)
    if (matches && matches.length > 0) return matches[0]
  }

  // Programområder may have a different format locally than in grep, the last four letters should be replaces with ----
  if (groupType === 'programområde') {
    const omraadeKode = groupId.split('_')[1].substring(0, 6) // Eks: 6_TPTIP1-AB1_TESVS@38099 should be TPTIP1----
    const omraadeMatch = grepdata.filter(obj => obj.kode === `${omraadeKode}----`)
    if (omraadeMatch && omraadeMatch.length > 0) return omraadeMatch[0]

    logger('info', ['get-grep-object', 'no grep found for', groupType, groupId])
  }

  if (['fag', 'undervisningsgruppe'].includes(groupType)) {
    const fagkode = groupId.split('_')[1]
    const fagkodeMatch = grepdata.filter(obj => obj.kode === fagkode)
    if (fagkodeMatch && fagkodeMatch.length > 0) return fagkodeMatch[0]
  }

  return null
}
