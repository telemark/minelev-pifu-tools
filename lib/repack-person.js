require('dotenv').config()
const getSchool = require('vtfk-schools-info')
const getMyGroups = require('./get-membership-for-person')
const getTrinn = require('./get-trinn')
const basisgrupper = require('../data/basisgrupper.json')
const undervisningsgrupper = require('../data/undervisningsgrupper.json')
const utdanningsprogrammer = require('../data/utdanningsprogrammer.json')

const resolveUserid = userids => {
  const resolved = userids.reduce((accumulator, current) => {
    accumulator[current.useridtype] = current.text
    if (current.useridtype === 'workforceID') {
      accumulator.type = 'teacher'
    }
    if (current.useridtype === 'studentID') {
      accumulator.type = 'student'
    }
    return accumulator
  }, {})
  return resolved
}

const resolvePhone = (arr, typeinfo) => {
  const phone = arr.reduce((accumulator, current) => {
    if (accumulator !== current.text) {
      if (typeinfo && current[typeinfo.name] === typeinfo.value) accumulator = current.text
    } else if (!typeinfo) accumulator = current.text
    return accumulator
  }, '')

  if (phone === '') return arr.length === 1 ? arr[0].text : phone
  return phone
}

const getMainGroup = (primarySchool, groups) => {
  const groupIds = basisgrupper.filter(basisGruppe => groups.includes(basisGruppe.id)).map(basisGruppe => basisGruppe.groupId)
  if (groupIds.length > 1 && primarySchool) {
    const schools = getSchool({ fullName: primarySchool })
    const school = schools.length > 0 ? schools[0] : false
    if (school) {
      const primaryGroup = groupIds.filter(groupId => groupId.includes(school.shortName))
      if (primaryGroup.length > 0) return primaryGroup[0]
    }
  }
  if (groupIds.length > 1 && !primarySchool) return groupIds[0]
  if (groupIds.length === 0) return
  return groupIds[0]
}

const cleanUpGroup = (group, removeGrep) => {
  delete group.memberIds
  if (removeGrep) delete group.grep
  return group
}

module.exports = person => {
  const userid = resolveUserid(person.userid)
  const id = userid.personNIN
  const ssn = id // fix av SSN med 11 nuller forran trengs ikke (med mindre noen har ugyldige ssn fra ViS'et...)
  const type = userid.type
  const sasUsername = userid.studentID || userid.workforceID
  const username = userid.username
  const email = userid.eMail

  const givenName = person.name.n.given
  const familyName = person.name.n.family
  const fullName = person.name.fn
  const birthday = person.demographics.bday
  const groupIds = getMyGroups(id)
  const mainGroupName = type === 'student' ? getMainGroup(userid.primarySchool, groupIds.basisgruppeIds) : false
  const phone = person.tel ? resolvePhone(person.tel, { name: 'teltype', value: '3' }) : ''
  const address = person.adr || {}
  const personalEmail = person.email || ''

  const { undervisningsgruppeIds, utdanningsprogramIds, basisgruppeNames, undervisningsgruppeNames } = groupIds
  const groups = type === 'student' ? undervisningsgrupper.filter(group => undervisningsgruppeIds.includes(group.id)).map(group => cleanUpGroup(group, true)) : []
  const userUtdanningsprogrammer = type === 'student' ? utdanningsprogrammer.filter(group => utdanningsprogramIds.includes(group.id)).map(cleanUpGroup) : []
  const userLevel = type === 'student' ? getTrinn(person, basisgruppeNames, undervisningsgruppeNames, mainGroupName) : false

  // remove unnecessary group arrays
  delete groupIds.basisgruppeNames
  delete groupIds.undervisningsgruppeNames

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
    level: userLevel,
    utdanningsprogrammer: userUtdanningsprogrammer,
    groups,
    ...groupIds
  }
}
