// excluded groups based on regex
const excluded = [
  '((/IOP)|(-IOP))' // IOP
]

// check if group matches excluded
const isExcluded = name => excluded.map(exclude => !!name.match(new RegExp(exclude))).includes(true)

module.exports = group => {
  let isUndervisningsgruppe = false
  if (group.grouptype && group.grouptype.typevalue && group.grouptype.typevalue.text) {
    isUndervisningsgruppe = group.grouptype.typevalue.text === 'undervisningsgruppe'
  }
  if (isUndervisningsgruppe && group.description && group.description.short) {
    isUndervisningsgruppe = isExcluded(group.description.short) === false
  }
  return isUndervisningsgruppe
}
