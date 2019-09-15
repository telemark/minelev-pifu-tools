const memberships = require('../data/memberships.json')

module.exports = uid => {
  const imAmember = membership => membership.memberIds.includes(uid)
  return memberships.filter(imAmember).map(membership => membership.id)
}
