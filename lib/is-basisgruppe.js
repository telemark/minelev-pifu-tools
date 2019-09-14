module.exports = group => {
  let isBasisgruppe = false
  if (group.grouptype && group.grouptype.typevalue && group.grouptype.typevalue['#text']) {
    isBasisgruppe = group.grouptype.typevalue['#text'] === 'basisgruppe'
  }
  return isBasisgruppe
}
