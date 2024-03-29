const { logger } = require('@vtfk/logger')

module.exports = (old = [], fresh = [], reAddUpdates = false) => {
  logger('info', ['compare-arrays', 'comparing arrays', 'start'])

  if (!old || old.length === 0) {
    logger('info', ['compare-arrays', 'no old array defined', 'add all'])
    return {
      add: fresh,
      remove: [],
      update: []
    }
  }

  // Remove all items per default, and pop them out if a similar old item was found and is updated..
  const remove = [...old]
  const add = []
  const update = []

  fresh.forEach(freshObj => {
    // const usernameOrId = ['student', 'teacher'].includes(freshObj.type) ? freshObj.username || 'unknownUsername' : freshObj.id

    // Get similar "old" object based on Id and Type.
    const oldObj = old.find(oldObj => oldObj.id === freshObj.id && oldObj.type === freshObj.type)

    // No old item was found - add new item.
    if (!oldObj) {
      // logger('debug', ['compare-arrays', 'added', freshObj.type, usernameOrId])
      add.push(freshObj)
      return
    }

    // Remove object id update obj if set
    if (oldObj._id) {
      delete oldObj._id
    }

    // If the objects differ its changed in some sort and should be updated.
    if (JSON.stringify(oldObj) !== JSON.stringify(freshObj)) {
      // logger('debug', ['compare-arrays', 'updated', freshObj.type, usernameOrId])
      if (reAddUpdates) {
        add.push(freshObj)
        return
      }

      update.push(freshObj)
    }

    // Object is either untouched, or updated and shouldn't be removed.
    remove.splice(remove.indexOf(oldObj), 1)
  })

  logger('info', ['compare-arrays', 'return', 'removals', remove.length])
  logger('info', ['compare-arrays', 'return', 'adds', add.length])
  logger('info', ['compare-arrays', 'return', 'updates', update.length])

  return {
    remove,
    add,
    update
  }
}
