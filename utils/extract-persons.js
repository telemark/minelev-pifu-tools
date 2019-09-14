(async () => {
  const { writeFile } = require('fs').promises
  const pifu = require('./data/pifu.json')
  const persons = pifu.enterprise.person
  console.log(`Got ${persons.length} persons`)
  await writeFile('data/persons.json', JSON.stringify(persons, null, 2), 'utf-8')
  console.log('finished')
})()
