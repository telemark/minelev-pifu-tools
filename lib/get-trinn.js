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

module.exports = (basisgruppeNames = [], undervisningsgruppeNames = [], mainGroupName = '', defaultTrinn = 'VG1') => {
  let level = getLevel(basisgruppeNames) || getLevel(undervisningsgruppeNames) || 0

  // No valid name, get trinn from mainGroupName.
  if (level === 0 && mainGroupName) {
    level = getLevel([mainGroupName])
  }

  return level === 0 ? defaultTrinn : `VG${level}`
}
