const getSchool = require('vtfk-schools-info')
const { logger } = require('@vtfk/logger')

const getSchoolInfo = schoolId => {
  const schoolInfo = getSchool({ schoolId })

  if (schoolInfo.length === 0) {
    logger('warn', ['extract-groups-skoler', 'schoolId not found', schoolId])
  } else if (schoolInfo.length > 1) {
    logger('warn', ['extract-groups-skoler', 'multiple schools found', schoolId])
  }

  return schoolInfo
}

module.exports = school => {
  const id = school.sourcedid.id
  const schoolInfo = getSchoolInfo(id)
  const schoolId = (schoolInfo.length === 1 && schoolInfo[0].shortName) || id
  const vigoNumber = id
  const type = 'skole'
  const organizationNumber = (schoolInfo.length === 1 && schoolInfo[0].organizationNumber) || 0
  const name = (schoolInfo.length === 1 && schoolInfo[0].fullName) || ''
  const email = (schoolInfo.length === 1 && schoolInfo[0].mail) || ''
  const phone = (schoolInfo.length === 1 && schoolInfo[0].phoneNumber) || ''
  const street = (schoolInfo.length === 1 && schoolInfo[0].address.street) || ''
  const city = (schoolInfo.length === 1 && schoolInfo[0].address.place) || ''
  const zip = (schoolInfo.length === 1 && schoolInfo[0].address.zip) || ''
  return {
    id,
    type,
    schoolId,
    organizationNumber,
    vigoNumber,
    name,
    email,
    phone,
    street,
    city,
    zip
  }
}
