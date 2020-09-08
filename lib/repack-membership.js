const repackMember = require('./repack-member')

module.exports = membership => {
  const id = membership.sourcedid ? membership.sourcedid.id : false
  const type = 'membership'
  const membersList = Array.isArray(membership.member) ? membership.member : [membership.member]
  const members = membersList.length > 0 ? membersList.map(repackMember) : []

  const activeMembers = members.filter(member => !member.validTo || new Date(member.validTo).getTime() === 0 || (new Date(member.validTo) >= new Date() && new Date(member.validFrom) < new Date()))
  const activeMemberIds = activeMembers.map(member => member.id)

  return {
    id,
    type,
    members: activeMembers,
    memberIds: activeMemberIds
  }
}
