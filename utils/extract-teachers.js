(async () => {
  const { writeFile } = require('fs').promises
  const isTeacher = require('./lib/is-teacher')
  const persons = require('./data/persons.json')
  console.log(`Got ${persons.length} persons`)
  const teachers = persons.filter(isTeacher)
  console.log(`Got ${teachers.length} teachers`)
  await writeFile('data/teachers.json', JSON.stringify(teachers, null, 2), 'utf-8')
  console.log('finished')
})()
