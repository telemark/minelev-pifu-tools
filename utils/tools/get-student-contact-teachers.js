const students = require('../../data/students.json')
const memberships = require('../../data/memberships.json')
const teachers = require('../../data/teachers.json')

const args = process.argv.slice(2)
if (args.length === 0) {
  console.error('Pass student fnr along (node get-student-contact-teachers.js 01234567890)')
  process.exit(1)
}
const studentFnr = args[0]

const student = students.find(stud => stud.id === studentFnr)
if (!student) {
  console.error('Student not found')
  process.exit(1)
}

student.kontaktlarergruppeIds.forEach(contactGroupId => {
  const contactGroupMembership = memberships.find(membership => membership.id === contactGroupId)
  const teacherIds = contactGroupMembership.members.filter(member => member.role === 'teacher').map(teacher => teacher.id)
  const contactTeachers = teacherIds.map(teach => teachers.filter(t => t.id === teach).map(teacher => ({ id: teacher.id, fullName: teacher.fullName, username: teacher.username, email: teacher.email })))
  console.log('Contact teachers in', contactGroupId)
  console.dir(contactTeachers)
})
