const { statSync, writeFileSync } = require('fs')
const { join, resolve } = require('path')
const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const getGroupCount = require('./lib/get-group-count')
const data = require('../../data/export.json')

const { helpme, id, expand, tofile } = yargs(hideBin(process.argv)).argv

if (helpme || !id) {
  console.warn('Pass along an id to identify the student:\n\t- node get-student-info.js --id=01234567890\n\t- node get-student-info.js --id=tes0123\n\t- node get-student-info.js --id=test.testesen@skole.vtfk.no\n\nPass --expand aswell to expand all output\n\nPass --tofile aswell to write info to file')
  process.exit(0)
}

const student = data.find(item => item.id === id || item.username === id.toLowerCase() || item.email === id.toLowerCase())
if (!student) {
  console.error(`Student not found by identification '${id}' 😬`)
  return
}
const studentFnr = student.id
const username = student.username
const type = student.type
const mail = student.email
const name = student.fullName

const studentGroupIds = [...student.groupIds, ...student.schoolIds]
const classes = studentGroupIds.map(studentGroupId => {
  const classGroup = data.find(item => item.id === studentGroupId)
  const teachers = classGroup.type === 'skole' ? undefined : classGroup.memberIds.map(personId => {
    const person = data.find(item => item.id === personId)
    if (person.type !== 'teacher') return null

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
    teacherCount: teachers.length,
    teachers
  }
})

const studentObj = {
  id: studentFnr,
  name,
  username,
  mail,
  type,
  classes
}

const teacherCounted = []
studentObj.teacherCount = classes.reduce((accumulator, current) => {
  if (['basis', 'undervisningsgruppe'].includes(current.type)) {
    let classCount = 0
    current.teachers.forEach(teacher => {
      if (!teacherCounted.includes(teacher.id)) {
        teacherCounted.push(teacher.id)
        classCount++
      }
    })
    return accumulator + classCount
  } else return accumulator
}, 0)
studentObj.uniqueTeacherMemberIds = teacherCounted

const lastModified = statSync(resolve('data/export.json')).mtime
const groupCount = getGroupCount(classes)
if (!expand) console.log(studentObj)
else console.log(JSON.stringify(studentObj, null, 2))
console.log(`\nThis is data from ${lastModified}\n\nStudent has ${classes.length} groups; ${groupCount.basisgrupper} ${groupCount.basisgrupper > 1 ? 'basisgrupper' : 'basisgruppe'}, ${groupCount.kontaktlarergrupper} ${groupCount.kontaktlarergrupper > 1 ? 'kontaktlærere' : 'kontaktlærer'}, ${groupCount.skoler} ${groupCount.skoler > 1 ? 'skoler' : 'skole'}, ${groupCount.undervisningsgrupper} ${groupCount.undervisningsgrupper > 1 ? 'undervisningsgrupper' : 'undervisningsgruppe'} and ${studentObj.teacherCount} ${studentObj.teacherCount > 1 ? 'teachers' : 'teacher'}`)

if (tofile) {
  const path = join(__dirname, '/../../data/student-info.json')
  writeFileSync(path, JSON.stringify(studentObj, null, 2), 'utf8')
  console.log('student-info written to', path)
}
