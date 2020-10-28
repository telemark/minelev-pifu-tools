module.exports = group => {
  let isUtdanningsprogram = false
  if (group.grouptype && group.grouptype.typevalue && group.grouptype.typevalue['#text']) {
    isUtdanningsprogram = group.grouptype.typevalue['#text'] === 'utdanningsprogram'
  }
  return isUtdanningsprogram
}
