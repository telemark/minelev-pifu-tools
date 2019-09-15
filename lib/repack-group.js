const getMembershipForGroup = require('./get-membership-for-group')

module.exports = group => {
  const id = group.sourcedid.id
  const groupId = group.description.long
  const type = group.grouptype.typevalue['#text']
  const name = group.description.short
  const description = group.description.full
  const validFrom = group.timeframe.begin['#text']
  const validTo = group.timeframe.end['#text']
  const adminPeriod = group.timeframe.adminPeriod
  const schoolName = group.relationship.label
  const schoolId = group.relationship.sourcedid.id
  const membership = getMembershipForGroup(id)
  const memberIds = membership.memberIds
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
