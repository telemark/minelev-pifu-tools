const getGrepObject = require('./get-grep-object')
const getMembershipForGroup = require('./get-membership-for-group')

function generateType (type, groupId, description) {
  if (groupId.toLowerCase().includes('orden')) {
    type = 'orden'
  }
  if (groupId.toLowerCase().includes('atferd')) {
    type = 'atferd'
  }
  if (description.toLowerCase().includes('orden')) {
    type = 'orden'
  }
  if (description.toLowerCase().includes('atferd')) {
    type = 'atferd'
  }
  if (type === 'kontaktlærergruppe') {
    type = 'kontaktlarergruppe'
  }
  return type
}

const resolvePifuExtension = (group, type) => {
  if (!group || !group.extension || !group.extension.pifu_id) return null

  const resolved = group.extension.pifu_id.reduce((accumulator, current) => {
    accumulator[current['@_type']] = current['#text']
    if (current['@_type'] === type) {
      accumulator.code = current.pifu_value
    }
    return accumulator
  }, {})

  return resolved.code || null
}

module.exports = group => {
  const id = group.sourcedid.id
  const groupId = group.description.long || id
  const description = group.description.full || group.description.long || ''
  const groupType = group.grouptype.typevalue['#text']
  const type = generateType(groupType, groupId, description)
  const name = group.description.short
  const validFrom = group.timeframe ? group.timeframe.begin['#text'] : '1971-11-18'
  const validTo = group.timeframe ? group.timeframe.end['#text'] : '1986-11-26'
  const adminPeriod = group.timeframe ? group.timeframe.adminPeriod : '1971/1986'
  const schoolName = group.relationship.label
  const schoolId = group.relationship.sourcedid.id
  const membership = getMembershipForGroup(id) || {}
  const memberIds = membership.memberIds || []

  const grepCodeId = resolvePifuExtension(group, 'grepCode')
  const grep = getGrepObject(groupType, id, grepCodeId) || undefined

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
