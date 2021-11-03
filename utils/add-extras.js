(async () => {
  const { existsSync, writeFileSync } = require('fs')
  const { resolve } = require('path')
  const { logger } = require('@vtfk/logger')

  const exportPath = resolve('./data/export.json')
  const extrasPath = resolve('./', 'extras.json')
  if (!existsSync(extrasPath)) {
    logger('info', ['add-extras', 'extras.json not present. Skipping...'])
    process.exit(0)
  }

  logger('info', ['add-extras', 'starting'])
  const data = require(exportPath)
  const { groups, students, teachers } = require(extrasPath)

  // merge in groups
  groups.forEach(group => {
    if (data.filter(d => d.id === group.id).length === 0) {
      data.push(group)
      logger('info', ['add-extras', 'group', group.groupId, 'added'])
    } else logger('warn', ['add-extras', 'group', group.groupId, 'already exists'])
  })

  // merge in students
  students.forEach(student => {
    if (data.filter(s => s.id === student.id).length === 0) {
      data.push(student)
      logger('info', ['add-extras', 'student', student.fullName, 'added'])

      // add student to groups
      student.groupIds.forEach(groupId => {
        const groupItem = data.find(item => item.id === groupId)
        if (!groupItem) {
          logger('error', ['add-extras', 'student', student.fullName, groupId, 'doesn\' exist!'])
          return
        }
        if (groupItem.memberIds.filter(memberId => memberId === student.id).length === 0) {
          groupItem.memberIds.push(student.id)
          logger('info', ['add-extras', 'student', student.fullName, groupId, 'added as member'])
        } else logger('warn', ['add-extras', 'student', student.fullName, groupId, 'already member'])
      })
    } else logger('warn', ['add-extras', 'student', student.fullName, 'already exists'])
  })

  // merge in teachers
  teachers.forEach(teacher => {
    if (data.filter(t => t.id === teacher.id).length === 0) {
      data.push(teacher)
      logger('info', ['add-extras', 'teacher', teacher.fullName, 'added'])

      // add teacher to groups
      teacher.groupIds.forEach(groupId => {
        const groupItem = data.find(item => item.id === groupId)
        if (!groupItem) {
          logger('error', ['add-extras', 'teacher', teacher.fullName, groupId, 'doesn\' exist!'])
          return
        }
        if (groupItem.memberIds.filter(memberId => memberId === teacher.id).length === 0) {
          groupItem.memberIds.push(teacher.id)
          logger('info', ['add-extras', 'teacher', teacher.fullName, groupId, 'added as member'])
        } else logger('warn', ['add-extras', 'teacher', teacher.fullName, groupId, 'already member'])
      })
    } else logger('warn', ['add-extras', 'teacher', teacher.fullName, 'already exists'])
  })

  // output new export.json data
  if (groups.length > 0 || students.length > 0 || teachers.length > 0) {
    writeFileSync(exportPath, JSON.stringify(data, null, 2), 'utf8')
  }
  logger('info', ['add-extras', 'added', `${groups.length} groups - ${students.length} students - ${teachers.length} teachers`])
  logger('info', ['add-extras', 'finished'])
})()
