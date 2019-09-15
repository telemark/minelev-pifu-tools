const memberships = require('../data/memberships.json')
const groups = require('../data/merged-groups.json')

module.exports = uid => {
  const imAmember = membership => membership.memberIds.includes(uid)
  const myGroups = memberships.filter(imAmember).map(membership => membership.id).map(id => groups[id])
  return myGroups.reduce((accumulator, current) => {
    if (current) {
      const { id, type } = current
      if (type === 'skoleeier') {
        accumulator.skoleeierIds.push(id)
      } else if (type === 'skole') {
        accumulator.schoolIds.push(id)
      } else {
        const key = `${type}Ids`
        accumulator.groupIds.push(id)
        accumulator[key].push(id)
      }
    }
    return accumulator
  }, { groupIds: [], schoolIds: [], skoleeierIds: [], ordenIds: [], atferdIds: [], fagIds: [], basisgruppeIds: [], kontaktlarergruppeIds: [], undervisningsgruppeIds: [] })
}
