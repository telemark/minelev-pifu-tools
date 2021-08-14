const { logger } = require('@vtfk/logger')

module.exports = (groupType, groupId, shortDesc, grepUri) => {
  const grepdata = []

  const findUri = obj => {
    const urlParts = grepUri.split('//')
    const regex = new RegExp(`((http)|(https))://${urlParts[1]}`)
    const match = obj.url.match(regex)
    return !!match
  }

  /* programområde grep codes can be one these types:
    - EX 1: FHH59N (6 chars)
    - EX 2: FDBLD3G1-- (10 chars)
    - EX 3: PBPBY3--DH (10 chars)
    - EX 4: BAAMF3---- (10 chars)
    - EX 5: STUSP1HR-3 (10 chars)
  */
  const getGrepCode = (replace = false) => {
    if (groupId.length > 6) {
      if (replace) return `${groupId.substring(0, 6)}----`
      else return groupId
    } else return groupId
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

  // Programområder may have a different format locally than in grep, the last four letters should be replaced with ----
  if (groupType === 'programområde') {
    let progkode = getGrepCode()
    let omraadeMatch = grepdata.filter(obj => obj.kode === progkode)
    if (omraadeMatch && omraadeMatch.length > 0) return omraadeMatch[0]

    progkode = getGrepCode(true)
    omraadeMatch = grepdata.filter(obj => obj.kode === progkode)
    if (omraadeMatch && omraadeMatch.length > 0) return omraadeMatch[0]

    logger('info', ['get-grep-object', 'no grep found for', groupType, progkode])
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
