const getMyGroups = require('./get-membership-for-person')
const getUsername = require('./get-username')

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
  const id = userid.personNIN
  const ssn =  `0${id}`.slice(-11)
  const type = userid.type
  const username = getUsername(ssn)
  const givenName = person.name.n.given
  const familyName = person.name.n.family
  const fullName = person.name.fn
  const birthday = person.demographics.bday
  const email = person.email
  const groups = getMyGroups(id)
  const phone = person.tel ? person.tel['#text'] : ''
  return {
    id,
    ssn,
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
