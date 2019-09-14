module.exports = group => {
  let isFaggruppe = false
  if (group.grouptype && group.grouptype.typevalue && group.grouptype.typevalue['#text']) {
    isFaggruppe = group.grouptype.typevalue['#text'] === 'fag'
  }
  return isFaggruppe
}
