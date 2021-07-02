module.exports = person => {
  let isTeacher = false
  const ids = person.userid.map(item => item.useridtype)
  isTeacher = ids.includes('workforceID')
  return isTeacher
}
