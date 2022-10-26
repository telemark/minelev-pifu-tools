const { writeFileSync } = require('fs')
const { join } = require('path')
const data = require('../../data/export.json')

const duplicates = data.filter(ek => data.filter(eks => eks.id === ek.id).length > 1).map(dup => dup.id)
const duplicateIds = []
duplicates.forEach(dup => {
  if (duplicateIds.includes(dup)) return
  duplicateIds.push(dup)
})

writeFileSync(join(__dirname, '/../../data/duplicate_ids.json'), JSON.stringify(duplicateIds, null, 2), 'utf8')
console.log('Found', duplicateIds.length, 'duplicate ids. Saved to data/duplicate_ids.json')
