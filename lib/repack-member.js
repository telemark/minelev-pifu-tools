function getRoleType (role) {
  let type = 'unknown'
  if (role['@_roletype'] === '01') {
    type = 'student'
  } if (role['@_roletype'] === '02') {
    type = 'teacher'
  }
  return type
}

module.exports = member => {
  const id = member.sourcedid ? member.sourcedid.id : false
  const type = 'member'
  const role = getRoleType(member.role)
  return {
    id,
    type,
    role,
    validFrom: member.role && member.role.timeframe ? member.role.timeframe.begin['#text'] : '1971-11-18',
    validTo: member.role && member.role.timeframe ? member.role.timeframe.end['#text'] : '1986-11-29'
  }
}
