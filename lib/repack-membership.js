const repackMember = require('./repack-member')

module.exports = membership => {
  const id = membership.sourcedid ? membership.sourcedid.id : false
  const type = 'membership'
  const membersList = Array.isArray(membership.member) ? membership.member : [membership.member]
  const members = membersList.length > 0 ? membersList.map(repackMember) : []
  const memberIds = members.map(member => member.id)

  return {
    id,
    type,
    members,
    memberIds
  }
}
