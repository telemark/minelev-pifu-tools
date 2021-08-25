(async () => {
  require('dotenv').config()
  const { writeFile } = require('fs').promises
  const { logger } = require('@vtfk/logger')
  const persons = require('../data/persons.json')
  const isStudent = require('../lib/is-student')
  const resolvePersonEntitlement = require('../lib/resolve-person-entitlement')
  const utdanningsprogrammer = require('../data/utdanningsprogrammer.json')
  const memberships = require('../data/memberships.json')

  const students = persons.filter(isStudent)

  logger('info', ['utils', 'link-groups-utdanningsprogrammer', 'utdanningsprogrammer', utdanningsprogrammer.length])
  logger('info', ['utils', 'link-groups-utdanningsprogrammer', 'memberships', memberships.length])
  logger('info', ['utils', 'link-groups-utdanningsprogrammer', 'persons', persons.length])
  logger('info', ['utils', 'link-groups-utdanningsprogrammer', 'students', students.length])

  students.forEach(student => {
    const studentUtdprog = resolvePersonEntitlement(student, 'utdanningsprogram')
    const studentId = student.sourcedid.id

    if (!studentUtdprog) {
      logger('error', ['utils', 'link-groups-utdanningsprogrammer', 'student', student.name.fn, 'missing utdanningsprogram in pifu_eduPersonEntitlement'])
      return
    }

    const utdprog = utdanningsprogrammer.find(utdanningsprogram => utdanningsprogram.grep && utdanningsprogram.grep.id.includes(studentUtdprog))
    if (!utdprog) {
      logger('error', ['utils', 'link-groups-utdanningsprogrammer', 'utdanningsprogram', studentUtdprog, 'not found in utdanningsprogrammer'])
      return
    } else {
      utdprog.memberIds.push(studentId)
    }

    const membership = memberships.find(member => member.id === utdprog.id)
    if (!membership) {
      logger('warn', ['utils', 'link-groups-utdanningsprogrammer', 'memberships', utdprog.id, 'not found in memberships. Will create it!'])
      memberships.push({
        id: utdprog.id,
        type: 'membership',
        memberIds: [studentId]
      })
    } else {
      membership.memberIds.push(studentId)
    }
  })

  logger('info', ['utils', 'link-groups-utdanningsprogrammer', 'utdanningsprogrammer', utdanningsprogrammer.length])
  logger('info', ['utils', 'link-groups-utdanningsprogrammer', 'memberships', memberships.length])
  await writeFile('data/utdanningsprogrammer.json', JSON.stringify(utdanningsprogrammer, null, 2), 'utf8')
  await writeFile('data/memberships.json', JSON.stringify(memberships, null, 2), 'utf8')
  logger('info', ['utils', 'link-groups-utdanningsprogrammer', 'utdanningsprogrammer', 'finished'])
})()
