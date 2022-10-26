const memberships = require('../data/memberships.json')
const groups = require('../data/merged-groups.json')

module.exports = (uid, type) => {
  const imAmember = membership => membership.members ? membership.members.find(member => member.id === uid && member.role === type) : membership.memberIds.includes(uid)
  const myGroups = memberships.filter(imAmember).map(membership => membership.id).map(id => groups[id])
  return myGroups.reduce((accumulator, current) => {
    if (current) {
      const { id, type, name } = current
      if (type === 'skole') {
        accumulator.schoolIds.push(id)
      } else if (type === 'utdanningsprogram') {
        accumulator.utdanningsprogramIds.push(id)
      } else if (type === 'undervisningsgruppe') {
        accumulator.undervisningsgruppeNames.push(name)
        accumulator.undervisningsgruppeIds.push(id)
        accumulator.groupIds.push(id)
      } else if (type === 'basisgruppe') {
        accumulator.basisgruppeNames.push(name)
        accumulator.basisgruppeIds.push(id)
        accumulator.groupIds.push(id)
      } else {
        const key = `${type}Ids`
        accumulator.groupIds.push(id)
        accumulator[key].push(id)
      }
    }
    return accumulator
  }, { groupIds: [], schoolIds: [], basisgruppeIds: [], basisgruppeNames: [], kontaktlarergruppeIds: [], undervisningsgruppeIds: [], undervisningsgruppeNames: [], utdanningsprogramIds: [] })
}
