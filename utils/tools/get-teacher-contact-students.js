const { writeFileSync } = require('fs')
const { join } = require('path')
const memberships = require('../../data/memberships.json')
const groups = require('../../data/groups.json')
const persons = require('../../data/persons.json')

const args = process.argv.slice(2)
if (args.length === 0) {
  console.error('Pass teacher fnr along (node get-teacher*.js 01234567890)')
  process.exit(1)
}
const teacherFnr = args[0]
const teacher = persons.find(p => p.sourcedid.id === teacherFnr)
const teacherUsername = teacher ? teacher.userid.find(userid => userid.useridtype === 'username') : undefined
const teacherType = teacher ? teacher.userid.find(userid => ['workforceID', 'studentID'].includes(userid.useridtype)) : undefined
const teacherMail = teacher ? teacher.userid.find(userid => userid.useridtype === 'eMail') : undefined
const teacherName = teacher ? teacher.name.fn : ''
const teacherObj = {
  id: teacherFnr,
  name: teacherName,
  username : teacherUsername ? teacherUsername.text : '',
  mail: teacherMail ? teacherMail.text : '',
  type : teacherType ? teacherType.useridtype : ''
}

const teacherClassObjs = memberships.filter(membership => membership.memberIds.includes(teacherFnr)).map(membership => ({ id: membership.id, students: membership.memberIds.filter(id => id !== teacherFnr) }))
const teacherClasses = []
teacherClassObjs.forEach(obj => {
  const classGroup = groups.find(group => group.sourcedid.id === obj.id)
  if (classGroup && classGroup.grouptype.typevalue.text === 'kontaktlærergruppe') {
    const classStudents = obj.students.map(id => {
      const student = persons.find(p => p.sourcedid.id === id)
      const username = student ? student.userid.find(userid => userid.useridtype === 'username') : undefined
      const type = student ? student.userid.find(userid => ['workforceID', 'studentID'].includes(userid.useridtype)) : undefined
      const name = student ? student.name.fn : ''

      return {
        id,
        name,
        username : username ? username.text : '',
        type : type ? type.useridtype : ''
      }
    })
    teacherClasses.push({
      id: obj.id,
      type: classGroup ? classGroup.grouptype.typevalue.text : undefined,
      name: classGroup ? classGroup.description.short : undefined,
      school: classGroup ? classGroup.relationship?.label : undefined,
      students: classStudents
    })
  }
})

teacherObj.classes = teacherClasses
teacherObj.studentCount = teacherClasses.reduce((accumulator, current) => (accumulator += current.students.length), 0)

console.log(`Teacher is contact teacher for ${teacherClasses.length} classes :`, teacherObj)

const path = join(__dirname, '/../../data/teacher-contact-students.json')
writeFileSync(path, JSON.stringify(teacherObj, null, 2), 'utf8')
console.log('teacher-contact-students written to', path)
