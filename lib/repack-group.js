const getSchool = require('vtfk-schools-info')
const getGrepObject = require('./get-grep-object')
const resolvePifuExtension = require('./resolve-pifu-extension')
const { capitilizeSentence } = require('./capitalize')
const getMembershipForGroup = require('./get-membership-for-group')
const { GREP: { UDIR_URL } } = require('../config')

const getName = (desc, school, type) => {
  let name = ''
  if (['basisgruppe', 'kontaktlærergruppe'].includes(type)) {
    name += desc.short
  } else if (['programområde', 'skole', 'utdanningsprogram'].includes(type)) {
    return desc.short
  } else if (type === 'undervisningsgruppe') {
    name += desc.short.split('/')[1]
  }

  return `${name}_${school.length === 1 ? school[0].shortName : ''}@${school.length === 1 ? school[0].schoolId : ''}`
}

const getDescription = value => {
  return (value && fixDescription(capitilizeSentence(value))) || ''
}

const fixDescription = desc => {
  return desc.replace('Kontaktlarergruppe', 'Kontaktlærergruppe for')
}

const generateType = type => {
  if (type === 'kontaktlærergruppe') {
    type = 'kontaktlarergruppe'
  }
  return type
}

const generateGroupId = (type, group, schoolInfo) => {
  if (type === 'kontaktlarergruppe') return getDescription(group.description.full)
  else if (type === 'utdanningsprogram') return `${group.sourcedid.id}_${(schoolInfo.length === 1 && schoolInfo[0].shortName) || (group.relationship && group.relationship.label) || ''}`
  else if (type === 'programområde') return group.sourcedid.id
  return (schoolInfo.length === 1 && `${schoolInfo[0].shortName}:${group.description.short}`) || group.sourcedid.id
}

const getTimeFrame = group => {
  const hasValidTimeFrame = timeframe => timeframe && timeframe.begin && timeframe.begin.text && timeframe.end && timeframe.end.text
  const validFrom = (hasValidTimeFrame(group.timeframe) && group.timeframe.begin.text) || '1971-11-18'
  const validTo = (hasValidTimeFrame(group.timeframe) && group.timeframe.end.text) || '1986-11-26'
  const adminPeriod = (group.timeframe && group.timeframe.adminperiod !== null && group.timeframe.adminperiod) || '1971/1986'

  return {
    validFrom,
    validTo,
    adminPeriod
  }
}

const getGrepUri = (systemUri, type) => {
  if (['programområde', 'undervisningsgruppe', 'utdanningsprogram'].includes(type)) {
    // get last url part and merge it with udir url
    const grepUri = `${UDIR_URL}/${systemUri.substring((systemUri.lastIndexOf('/') + 1))}`
    return grepUri
  }

  return null
}

module.exports = group => {
  const id = group.sourcedid.id
  const schoolId = (group.relationship && group.relationship.sourcedid.id) || '' // TODO: Sjekke denne i prod
  const schoolInfo = getSchool({ schoolId })
  const name = getName(group.description, schoolInfo, group.grouptype.typevalue.text)
  const schoolName = (schoolInfo.length === 1 && schoolInfo[0].fullName) || (group.relationship && group.relationship.label) || '' // TODO: Sjekke denne i prod
  const description = getDescription(group.description.full)
  const type = generateType(group.grouptype.typevalue.text)
  const groupId = generateGroupId(type, group, schoolInfo)
  const { validFrom, validTo, adminPeriod } = getTimeFrame(group)
  const membership = getMembershipForGroup(id) || {}
  const memberIds = membership.memberIds || []

  const systemUri = resolvePifuExtension(group, 'groupSystemIdUri')
  const grepUri = systemUri ? getGrepUri(systemUri, type) : null
  const grep = getGrepObject(type, id, name, grepUri) || undefined

  return {
    id,
    groupId,
    type,
    name,
    description,
    schoolId,
    schoolName,
    validFrom,
    validTo,
    adminPeriod,
    grep,
    memberIds
  }
}
