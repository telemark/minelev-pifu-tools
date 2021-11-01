const resolvePersonEntitlement = require('./resolve-person-entitlement')

const getLevel = names => {
  let level = 0

  names.forEach(name => {
    const matches = name.match(/\d+/g) // get only number parts
    if (matches) {
      const numbers = matches.filter(num => num < 5) // get only numbers that are less than 5
      if (numbers.length === 1 && numbers[0] > level) {
        level = numbers[0]
      } else if (numbers.length > 1) {
        numbers.forEach(num => {
          if (num > level) {
            level = num
          }
        })
      }
    }
  })

  return level
}

module.exports = (person, basisgruppeNames = [], undervisningsgruppeNames = [], mainGroupName = '', defaultTrinn = 'VG1') => {
  // get trinn from mainGroupName
  let level = getLevel([mainGroupName])
  if (level) {
    if (level > 3) return `VG${level - (level - 3)}` // level 4 becomes 3, level 5 becomes 3
    return `VG${level}`
  }

  // trinn not found, get trinn from pifu_eduPersonEntitlement
  level = resolvePersonEntitlement(person, 'aarstrinn')
  if (level) return level.toUpperCase()

  // trinn not found, get trinn from basisGrupper or undervisningsGrupper
  level = getLevel(basisgruppeNames) || getLevel(undervisningsgruppeNames) || 0

  return level === 0 ? defaultTrinn : `VG${level}`
}
