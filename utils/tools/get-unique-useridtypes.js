(async () => {
  const persons = require('./data/persons.json')
  const uniques = persons.reduce((accumulator, current) => {
    if (Array.isArray(current.userid)) {
      const uniques = current.userid.filter(uid => !accumulator.includes(uid.useridtype))
      if (uniques.length > 0) {
        const ids = uniques.map(item => item.useridtype)
        accumulator.push(...ids)
      }
    }
    return accumulator
  }, [])
  console.log(uniques)
})()
