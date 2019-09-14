module.exports = group => {
  let isSkole = false
  if (group.grouptype && group.grouptype.typevalue && group.grouptype.typevalue['#text']) {
    isSkole = group.grouptype.typevalue['#text'] === 'skole'
  }
  return isSkole
}
