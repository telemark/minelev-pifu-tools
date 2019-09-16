const usernames = require('../data/usernames.json')

module.exports = ssn => {
  const user = usernames.find(user => user.SocialSecurityNumber === ssn)
  return user ? user.Username : ''
}
