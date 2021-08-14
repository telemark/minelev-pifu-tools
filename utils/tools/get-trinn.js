(async () => {
  const repackPerson = require('../../lib/repack-person')

  const student = {} // insert student json object from persons.json here

  const repacked = repackPerson(student)
  console.log(repacked)
})()
