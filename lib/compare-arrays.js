module.exports = (old = [], fresh = []) => {
  if (!old || old.length === 0) {
    return {
      add: fresh,
      remove: [],
      updates: []
    }
  }

  // Remove all items per default, and pop them out if a similar old item was found and is updated..
  const remove = [...old]
  const add = []
  const updates = []

  fresh.forEach(freshObj => {
    // Get similar "old" object based on Id and Type.
    const oldObj = old.find(oldObj => oldObj.id === freshObj.id && oldObj.type === freshObj.type)

    // No old item was found - add new item.
    if (!oldObj) {
      console.log('no item was found', freshObj.id, freshObj.type)
      add.push(freshObj)
      return
    }

    // If the objects differ its changed in some sort and should be updated.
    if (JSON.stringify(oldObj) !== JSON.stringify(freshObj)) {
      updates.push(freshObj)
    }

    // Object is either untouched, or updated and shouldn't be removed.
    remove.splice(remove.indexOf(oldObj), 1)
  })

  return {
    remove,
    add,
    updates
  }
}
