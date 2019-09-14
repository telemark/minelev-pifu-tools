module.exports = person => {
  let isStudent = false
  if (Array.isArray(person.userid)) {
    const ids = person.userid.map(item => item['@_useridtype'])
    isStudent = ids.includes('studentID')
  }
  return isStudent
}
