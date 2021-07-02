(async () => {
  const groups = require('./data/groups.json')
  const uniques = groups.reduce((accumulator, current) => {
    if (!accumulator.includes(current.grouptype.typevalue.text)) {
      accumulator.push(current.grouptype.typevalue.text)
    }
    return accumulator
  }, [])
  console.log(uniques)
})()
