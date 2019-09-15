const getMembershipForGroup = require('./get-membership-for-group')
const resolveIds = ids => {
  const resolved = ids.reduce((accumulator, current) => {
    accumulator[current['@_useridtype']] = current['#text']
    return accumulator
  }, {})
  return resolved
}
module.exports = group => {
  const ids = resolveIds(group.extension.pifu_id)
  const id = group.sourcedid.id
  const type = group.grouptype.typevalue['#text']
  const organizationNumber = ids.organizationNumber
  const countyNumber = ids.countyNumber
  const name = group.description.short
  const membership = getMembershipForGroup(id) || {}
  const memberIds = membership.memberIds || []
  return {
    id,
    type,
    organizationNumber,
    countyNumber,
    name,
    memberIds
  }
}
