const getMyGroups = require('./get-membership-for-person')
const getUsernameFromVigoBAS = require('./get-username-from-vigobas')

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
module.exports = person => {
  const userid = resolveUserid(person.userid)
  const id = userid.personNIN.length === 10 ? userid.personNIN : `0${userid.personNIN}`
  const type = userid.type
  const username = getUsernameFromVigoBAS(id)
  const givenName = person.name.n.given
  const familyName = person.name.n.family
  const fullName = person.name.fn
  const birthday = person.demographics.bday
  const email = person.email
  const groups = getMyGroups(id)
  const phone = person.tel ? person.tel['#text'] : ''
  return {
    id,
    type,
    username,
    givenName,
    familyName,
    fullName,
    birthday,
    email,
    phone,
    ...groups
  }
}
