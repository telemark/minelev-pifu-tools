module.exports = (group, type) => {
  if (!group || !group.extension || !group.extension.pifu_id || !Array.isArray(group.extension.pifu_id)) return null

  const resolved = group.extension.pifu_id.reduce((accumulator, current) => {
    if (current.type === type) {
      accumulator.uri = current.pifu_value
    }
    return accumulator
  }, {})

  return resolved.uri || null
}
