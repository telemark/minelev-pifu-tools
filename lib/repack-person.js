require('dotenv').config()
const getMyGroups = require('./get-membership-for-person')
const getVigobasUser = require('./get-vigobas-user')
const basisgrupper = require('../data/basisgrupper.json')
const faggrupper = require('../data/faggrupper.json')

const resolveUserid = userids => {
  const resolved = userids.reduce((accumulator, current) => {
    accumulator[current['@_useridtype']] = current['#text']
    if (current['@_useridtype'] === 'workforceID') {
      accumulator.type = 'teacher'
    }
    if (current['@_useridtype'] === 'studentID') {
      accumulator.type = 'student'
    }
    return accumulator
  }, {})
  return resolved
}

const getMainGroup = group => {
  if (group.length === 0) return
  const { groupId } = basisgrupper.find(basisGruppe => basisGruppe.id === group[0]) || {}
  return groupId
}

const cleanUpGroup = group => {
  delete group.memberIds
  return group
}

module.exports = person => {
  const userid = resolveUserid(person.userid)
  const id = userid.personNIN
  const ssn = `00000000000${id}`.slice(-11)
  const type = userid.type
  const sasUsername = userid.username || userid.studentID || userid.workforceID

  const givenName = person.name.n.given
  const familyName = person.name.n.family
  const fullName = person.name.fn
  const birthday = person.demographics.bday
  const groupIds = getMyGroups(id)
  const mainGroupName = type === 'student' ? getMainGroup(groupIds.basisgruppeIds) : false
  const phone = person.tel ? person.tel['#text'] : ''
  const address = person.adr || {}
  const personalEmail = person.email || ''

  const vigoBasUser = process.env.VIGOBAS === 'true' ? getVigobasUser(ssn) : null
  const username = vigoBasUser ? vigoBasUser.username : ''
  const email = vigoBasUser ? vigoBasUser.mail : ''

  const { fagIds } = groupIds
  const groups = type === 'student' ? faggrupper.filter(group => fagIds.includes(group.id)).map(cleanUpGroup) : []
  return {
    id,
    ssn,
    type,
    username,
    sasUsername,
    givenName,
    familyName,
    fullName,
    birthday,
    email,
    personalEmail,
    phone,
    address,
    mainGroupName,
    groups,
    ...groupIds
  }
}
