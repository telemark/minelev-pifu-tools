module.exports = group => {
  let isUndervisningsgruppe = false
  if (group.grouptype && group.grouptype.typevalue && group.grouptype.typevalue.text) {
    isUndervisningsgruppe = group.grouptype.typevalue.text === 'undervisningsgruppe'
  }
  return isUndervisningsgruppe
}
