module.exports = (trinnMemberships = [], mainGroupName = '', defaultTrinn = 'VG1') => {
  let level = 0

  trinnMemberships.forEach(trinnId => {
    const trinn = trinnId.split('_')[1] // '4_VG1_TESVS@38031' => 'VG1' eller '4__TESVS@38031' => ''
    if (!trinn || trinn === '') return

    const trinnLevel = parseInt(/\d/.exec(trinn))
    if (trinnLevel > level) level = trinnLevel
  })

  // No valid trinnId, get trinn from mainGroupName.
  if (level === 0 && mainGroupName) {
    const groupSplit = mainGroupName.split(':')
    if (groupSplit.length >= 1) {
      level = parseInt(/\d/.exec(groupSplit[1]))
    }
  }

  return level === 0 ? defaultTrinn : `VG${level}`
}
