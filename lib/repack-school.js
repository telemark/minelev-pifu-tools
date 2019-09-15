const resolveIds = ids => {
  return ids.reduce((accumulator, current) => {
    accumulator[current['@_type']] = current.pifu_value
    return accumulator
  }, {})
}

module.exports = school => {
  const ids = resolveIds(school.extension.pifu_id)
  const id = school.sourcedid.id
  const type = 'skole'
  const organizationNumber = ids.organizationNumber
  const vigoNumber = ids.vigoNumber
  const name = school.description.short
  const email = school.extension.pifu_email ? school.extension.pifu_email['#text'] : ''
  const phone = school.extension.pifu_tel['#text']
  const street = school.extension.pifu_adr.adr.street
  const city = school.extension.pifu_adr.adr.locality
  const zip = school.extension.pifu_adr.adr.pcode
  return {
    id,
    type,
    organizationNumber,
    vigoNumber,
    name,
    email,
    phone,
    street,
    city,
    zip
  }
}
