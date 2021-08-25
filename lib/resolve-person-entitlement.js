module.exports = (person, type) => {
  if (!person || !person.extension || !person.extension.pifu_eduPersonEntitlement || !Array.isArray(person.extension.pifu_eduPersonEntitlement)) return null

  const resolved = person.extension.pifu_eduPersonEntitlement.reduce((accumulator, current) => {
    if (current.text.includes(type)) {
      accumulator = current.text.substring(current.text.lastIndexOf('/') + 1)
    }
    return accumulator
  }, '')

  return resolved || null
}
