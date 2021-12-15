const { statSync, writeFileSync } = require('fs')
const { join, resolve } = require('path')
const memberships = require('../../data/memberships.json')
const groups = require('../../data/groups.json')
const persons = require('../../data/persons.json')
const getGroupCount = require('./lib/get-group-count')

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
  username: teacherUsername ? teacherUsername.text : '',
  mail: teacherMail ? teacherMail.text : '',
  type: teacherType ? teacherType.useridtype : ''
}

const teacherClassObjs = memberships.filter(membership => membership.memberIds.includes(teacherFnr)).map(membership => ({ id: membership.id, students: membership.memberIds.filter(id => id !== teacherFnr) }))
const teacherClasses = teacherClassObjs.map(obj => {
  const classGroup = groups.find(group => group.sourcedid.id === obj.id)
  const classStudents = obj.students.map(id => {
    const student = persons.find(p => p.sourcedid.id === id)
    const username = student ? student.userid.find(userid => userid.useridtype === 'username') : undefined
    const type = student ? student.userid.find(userid => ['workforceID', 'studentID'].includes(userid.useridtype)) : undefined
    const name = student ? student.name.fn : ''

    return {
      id,
      name,
      username: username ? username.text : '',
      type: type ? type.useridtype : ''
    }
  })
  return {
    id: obj.id,
    type: classGroup ? classGroup.grouptype.typevalue.text : undefined,
    name: classGroup ? classGroup.description.short : undefined,
    school: classGroup ? classGroup.relationship?.label : undefined,
    students: classStudents
  }
})

teacherObj.classes = teacherClasses
const studentCounted = []
teacherObj.studentCount = teacherClasses.reduce((accumulator, current) => {
  if (['basis', 'undervisningsgruppe'].includes(current.type)) {
    let classCount = 0
    current.students.forEach(student => {
      if (!studentCounted.includes(student.id)) {
        studentCounted.push(student.id)
        classCount++
      }
    })
    return accumulator + classCount
  } else return accumulator
}, 0)
teacherObj.uniqueStudentMemberIds = studentCounted

const lastModified = statSync(resolve('data/memberships.json')).mtime
const groupCount = getGroupCount(teacherClasses)
console.log(`This is data from ${lastModified}\n\nTeacher has ${teacherClasses.length} groups; ${groupCount.basisgrupper} basisgrupper, ${groupCount.kontaktlarergrupper} kontaktlærergrupper, ${groupCount.skoler} skoler, ${groupCount.undervisningsgrupper} undervisningsgrupper and ${teacherObj.studentCount} students :`, teacherObj)

const path = join(__dirname, '/../../data/teacher-students.json')
writeFileSync(path, JSON.stringify(teacherObj, null, 2), 'utf8')
console.log('teacher-students written to', path)
