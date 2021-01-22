module.exports = (trinnMemberships = []) => {
  let level = 1

  trinnMemberships.forEach(trinnId => {
    const trinn = trinnId.split('_')[1] // '4_VG1_TESVS@38031' => 'VG1' eller '4__TESVS@38031' => ''
    if (!trinn || trinn === '') return

    const trinnLevel = parseInt(/\d/.exec(trinn))
    if (trinnLevel > level) level = trinnLevel
  })

  return `VG${level}`
}
