function getRealType(item) {
  let itemType = typeof item
  if (itemType === 'object') {
    if (Array.isArray(item)) {
      itemType = 'array'
    } else if (item === null) {
      itemType = 'null'
    }
  }
  return itemType
}

module.exports = {
  getRealType,
}
