const { writeFileSync } = require('fs')
const { join } = require('path')
const students = require('../../data/students.json')

const missingContactTeacher = students.filter(student => !student.kontaktlarergruppeIds || student.kontaktlarergruppeIds.length === 0)

console.log('Students missing contact teacher:', missingContactTeacher.length)

if (missingContactTeacher) {
  const path = join(__dirname, '/../../data/students-missing-contact-teacher.json')
  writeFileSync(path, JSON.stringify(missingContactTeacher, null, 2), 'utf8')
  console.log(missingContactTeacher.length, 'students written to', path)
}
