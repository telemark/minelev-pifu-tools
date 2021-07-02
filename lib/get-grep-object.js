const { logger } = require('@vtfk/logger')

module.exports = (groupType, groupId, shortDesc, grepUri) => {
  const grepdata = []

  const findUri = obj => {
    const urlParts = grepUri.split('//')
    const regex = new RegExp(`((http)|(https))://${urlParts[1]}`)
    const match = obj.url.match(regex)
    return !!match
  }

  // programområde grep codes can be one of three types. EX 1: FHH59N (6 chars) or EX 2: FDBLD3G1-- (10 chars) or EX 3: PBPBY3--DH (10 chars)
  const getGrepCode = () => {
    // this handles types 2 and 3
    if (groupId.includes('-')) return `${groupId.substring(0, groupId.indexOf('-'))}----`.substring(0, 10)
    // this handles type 1
    return groupId
  }

  // Load data based on type
  if (groupType === 'undervisningsgruppe') {
    grepdata.push(...(require('../data/grep-fagkoder.json')))
  } else if (groupType === 'programområde') {
    grepdata.push(...(require('../data/grep-programomraader.json')))
  } else if (groupType === 'utdanningsprogram') {
    grepdata.push(...(require('../data/grep-utdanningsprogram.json')))
  } else {
    return null
  }

  // if grepUri is sent, return first match based on url field
  if (grepUri) {
    const matches = grepdata.filter(findUri)
    if (matches && matches.length > 0) return matches[0]
  }

  // if grepUri is not sent, return first match based on kode field
  if (groupType === 'programområde') {
    // sometimes grep code can have a program specific ending (ex: --DH) instead of normal ending (----). grep code length is 10
    const progkode = getGrepCode()
    const omraadeMatch = grepdata.filter(obj => obj.kode === progkode)
    if (omraadeMatch && omraadeMatch.length > 0) return omraadeMatch[0]

    logger('info', ['get-grep-object', 'no grep found for', groupType, groupId])
  }

  // if grep still not found, try finding it based on short description
  if (groupType === 'undervisningsgruppe') {
    const fagkodeSplit = shortDesc.split('/')
    const fagkode = fagkodeSplit.length > 1 ? fagkodeSplit[1] : groupId
    const fagkodeMatch = grepdata.filter(obj => obj.kode === fagkode)
    if (fagkodeMatch && fagkodeMatch.length > 0) return fagkodeMatch[0]
  }

  return null
}
