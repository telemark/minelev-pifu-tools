module.exports = group => {
  let isProgramomraade = false
  if (group.grouptype && group.grouptype.typevalue && group.grouptype.typevalue['#text']) {
    isProgramomraade = group.grouptype.typevalue['#text'] === 'programområde'
  }
  return isProgramomraade
}
