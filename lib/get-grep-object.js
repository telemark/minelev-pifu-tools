const { logger } = require('@vtfk/logger')

module.exports = (groupType, groupId, shortDesc, grepUri) => {
  const grepdata = []

  const findUri = obj => {
    const urlParts = grepUri.split('//')
    const regex = new RegExp(`((http)|(https))://${urlParts[1]}`)
    const match = obj.url.match(regex)
    return !!match
  }

  // Load data based on type
  if (groupType === 'undervisningsgruppe') {
    grepdata.push(...(require('../data/grep-fagkoder.json')))
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
  if (groupType === 'utdanningsprogram') {
    const utdanningMatch = grepdata.filter(obj => obj.kode === groupId)
    if (utdanningMatch && utdanningMatch.length > 0) return utdanningMatch[0]

    logger('info', ['get-grep-object', 'no grep found for', groupType, groupId])
  }

  // if grep still not found, try finding it based on short description
  if (groupType === 'undervisningsgruppe') {
    const fagkodeMatches = shortDesc.replace(/ /g, '').match(/[A-Z]{3}[0-9]{4}/)
    const fagkode = fagkodeMatches ? fagkodeMatches[0] : groupId
    const fagkodeMatch = grepdata.filter(obj => obj.kode === fagkode)
    if (fagkodeMatch && fagkodeMatch.length > 0) return fagkodeMatch[0]

    logger('info', ['get-grep-object', 'no grep found for', groupType, fagkode || groupId])
  }

  return null
}
