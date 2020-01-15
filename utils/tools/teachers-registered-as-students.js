const students = require('../../data/students.json')
const teachers = students.filter(s => s.email.endsWith('@vtfk.no'))

teachers.forEach(t => {
  console.log(`${t.givenName} ${t.familyName} (${t.email}) - ${t.schoolIds.join(' / ')}`)
})
