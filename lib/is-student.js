module.exports = person => {
  let isStudent = false
  const ids = person.userid.map(item => item.useridtype)
  isStudent = ids.includes('studentID')
  return isStudent
}
