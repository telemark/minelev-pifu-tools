const getMembershipForGroup = require('./get-membership-for-group')
function generateType (type, groupId) {
  if (groupId.toLowerCase().includes('orden')) {
    type = 'orden'
  }
  if (groupId.toLowerCase().includes('atferd')) {
    type = 'atferd'
  }
  return type
}

module.exports = group => {
  const id = group.sourcedid.id
  const groupId = group.description.long
  const type = generateType(group.grouptype.typevalue['#text'], groupId)
  const name = group.description.short
  const description = group.description.full || group.description.long
  const validFrom = group.timeframe ? group.timeframe.begin['#text'] : '1971-11-18'
  const validTo = group.timeframe ? group.timeframe.end['#text'] : '1986-11-26'
  const adminPeriod = group.timeframe ? group.timeframe.adminPeriod : '1971/1986'
  const schoolName = group.relationship.label
  const schoolId = group.relationship.sourcedid.id
  const membership = getMembershipForGroup(id) || {}
  const memberIds = membership.memberIds || []
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
    memberIds
  }
}
