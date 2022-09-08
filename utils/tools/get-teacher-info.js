const { statSync, writeFileSync } = require('fs')
const { join, resolve } = require('path')
const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const getGroupCount = require('./lib/get-group-count')
const data = require('../../data/export.json')

const { helpme, id, expand, tofile } = yargs(hideBin(process.argv)).argv

if (helpme || !id) {
  console.warn('Pass along an id to identify the teacher:\n\t- node get-teacher-info.js --id=01234567890\n\t- node get-teacher-info.js --id=tes0123\n\t- node get-teacher-info.js --id=test.testesen@vtfk.no\n\nPass --expand aswell to expand all output\n\nPass --tofile aswell to write info to file')
  process.exit(0)
}

const teacher = data.find(item => item.id === id || item.username === id.toLowerCase() || item.email === id.toLowerCase())
if (!teacher) {
  console.error(`Teacher not found by identification '${id}' 😬`)
  return
}
const teacherFnr = teacher.id
const username = teacher.username
const type = teacher.type
const mail = teacher.email
const name = teacher.fullName

const teacherGroupIds = [...teacher.groupIds, ...teacher.schoolIds]
const classes = teacherGroupIds.map(teacherGroupId => {
  const classGroup = data.find(item => item.id === teacherGroupId)
  const teachers = []
  const students = classGroup.type === 'skole' ? undefined : classGroup.memberIds.map(personId => {
    const person = data.find(item => item.id === personId)
    if (person.type !== 'student') {
      teachers.push({
        id: person.id,
        name: person.fullName,
        username: person.username,
        type: person.type
      })
      return null
    }

    return {
      id: person.id,
      name: person.fullName,
      username: person.username,
      type: person.type
    }
  }).filter(person => !!person)

  if (classGroup.type === 'skole') {
    return {
      id: classGroup.id,
      type: classGroup.type,
      name: classGroup.name
    }
  } else return {
    id: classGroup.id,
    type: classGroup.type,
    name: classGroup.name,
    school: classGroup.schoolName,
    studentCount: students.length,
    teacherCount: teachers.length,
    students,
    teachers
  }
})

const teacherObj = {
  id: teacherFnr,
  name,
  username,
  mail,
  type,
  classes
}

const studentCounted = []
teacherObj.studentCount = classes.reduce((accumulator, current) => {
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

const lastModified = statSync(resolve('data/export.json')).mtime
const groupCount = getGroupCount(classes)
if (!expand) console.log(teacherObj)
else console.log(JSON.stringify(teacherObj, null, 2))
console.log(`\nThis is data from ${lastModified}\n\nTeacher has ${classes.length} groups; ${groupCount.basisgrupper} ${groupCount.basisgrupper > 1 ? 'basisgrupper' : 'basisgruppe'}, ${groupCount.kontaktlarergrupper} ${groupCount.kontaktlarergrupper > 1 ? 'kontaktlærergrupper' : 'kontaktlærergruppe'}, ${groupCount.skoler} ${groupCount.skoler > 1 ? 'skoler' : 'skole'}, ${groupCount.undervisningsgrupper} ${groupCount.undervisningsgrupper > 1 ? 'undervisningsgrupper' : 'undervisningsgruppe'} and ${teacherObj.studentCount} ${teacherObj.studentCount > 1 ? 'students' : 'student'}`)

if (tofile) {
  const path = join(__dirname, '/../../data/teacher-info.json')
  writeFileSync(path, JSON.stringify(teacherObj, null, 2), 'utf8')
  console.log('teacher-info written to', path)
}
