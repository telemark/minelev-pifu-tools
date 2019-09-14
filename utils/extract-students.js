(async () => {
  const { writeFile } = require('fs').promises
  const isStudent = require('./lib/is-student')
  const persons = require('./data/persons.json')
  console.log(`Got ${persons.length} persons`)
  const students = persons.filter(isStudent)
  console.log(`Got ${students.length} students`)
  await writeFile('data/students.json', JSON.stringify(students, null, 2), 'utf-8')
  console.log('finished')
})()
