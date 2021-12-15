const { statSync } = require('fs')
const { resolve } = require('path')
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
const username = teacher ? teacher.userid.find(userid => userid.useridtype === 'username') : undefined
const type = teacher ? teacher.userid.find(userid => ['workforceID', 'studentID'].includes(userid.useridtype)) : undefined
const mail = teacher ? teacher.userid.find(userid => userid.useridtype === 'eMail') : undefined
const name = teacher ? teacher.name.fn : ''
const teacherObj = {
  id: teacherFnr,
  name,
  username: username ? username.text : '',
  mail: mail ? mail.text : '',
  type: type ? type.useridtype : ''
}

const teacherClassIds = memberships.filter(membership => membership.memberIds.includes(teacherFnr)).map(membership => membership.id)
const teacherClasses = []
teacherClassIds.forEach(id => {
  const classGroup = groups.find(group => group.sourcedid.id === id)
  if (classGroup && classGroup.grouptype.typevalue.text === 'kontaktlærergruppe') {
    teacherClasses.push({
      id,
      type: classGroup ? classGroup.grouptype.typevalue.text : undefined,
      name: classGroup ? classGroup.description.short : undefined,
      school: classGroup ? classGroup.relationship?.label : undefined
    })
  }
})

teacherObj.classes = teacherClasses

const lastModified = statSync(resolve('data/memberships.json')).mtime
console.log(`This is data from ${lastModified}\n\nTeacher is contact teacher for ${teacherClasses.length} classes :`, teacherObj)
