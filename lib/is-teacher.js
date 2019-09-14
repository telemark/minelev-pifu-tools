module.exports = person => {
  let isTeacher = false
  if (Array.isArray(person.userid)) {
    const ids = person.userid.map(item => item['@_useridtype'])
    isTeacher = ids.includes('workforceID')
  }
  return isTeacher
}
