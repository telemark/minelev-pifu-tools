module.exports.capitilizeWord = word => {
  word = word.toLowerCase()

  return `${word[0].toUpperCase()}${word.slice(1)}`
}

module.exports.capitilizeSentence = sentence => {
  const sentenceSplit = sentence.split(' ')
  const firstWord = this.capitilizeWord(sentenceSplit[0])
  const rest = sentenceSplit.slice(1).join(' ')

  return `${firstWord} ${rest}`
}
