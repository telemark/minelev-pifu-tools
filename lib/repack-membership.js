const repackMember = require('./repack-member')

module.exports = membership => {
  const id = membership.sourcedid ? membership.sourcedid.id : false
  const type = 'membership'
  const members = Array.isArray(membership.member) ? membership.member.map(repackMember) : []
  const memberIds = members.map(member => member.id)
  return {
    id,
    type,
    members,
    memberIds
  }
}
