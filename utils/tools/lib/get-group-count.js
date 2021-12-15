module.exports = classes => {
  return classes.reduce((accumulator, current) => {
    if (current.type === 'basisgruppe') accumulator.basisgrupper++
    else if (current.type === 'kontaktlærergruppe') accumulator.kontaktlarergrupper++
    else if (current.type === 'skole') accumulator.skoler++
    else if (current.type === 'undervisningsgruppe') accumulator.undervisningsgrupper++

    return accumulator
  }, { basisgrupper: 0, kontaktlarergrupper: 0, skoler: 0, undervisningsgrupper: 0 })
}
