module.exports = group => {
  let isSkoleeier = false
  if (group.grouptype && group.grouptype.typevalue && group.grouptype.typevalue['#text']) {
    isSkoleeier = group.grouptype.typevalue['#text'] === 'skoleeier'
  }
  return isSkoleeier
}
