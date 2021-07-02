module.exports = group => {
  let isKontaktlarergruppe = false
  if (group.grouptype && group.grouptype.typevalue && group.grouptype.typevalue.text) {
    isKontaktlarergruppe = group.grouptype.typevalue.text === 'kontaktlærergruppe'
  }
  return isKontaktlarergruppe
}
