const vigobasUsers = require('../data/vigobasUsers.json')

module.exports = (ssn) => {
  const vigobasUser = vigobasUsers.find(user => user.SocialSecurityNumber === ssn)
  return {
    username: vigobasUser ? vigobasUser.username : '',
    mail: vigobasUser ? vigobasUser.mail : ''
  }
}
