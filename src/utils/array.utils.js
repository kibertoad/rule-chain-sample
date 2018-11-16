function ensureArray(entity) {
  if (!Array.isArray(entity)) {
    return [entity]
  }
  return entity
}

module.exports = {
  ensureArray
}
