const memberships = require('../data/memberships.json')

module.exports = id => memberships.find(membership => membership.id === id)
