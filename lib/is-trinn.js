module.exports = group => {
  let isTrinn = false
  if (group.grouptype && group.grouptype.typevalue && group.grouptype.typevalue['#text']) {
    isTrinn = group.grouptype.typevalue['#text'] === 'trinn'
  }
  return isTrinn
}
