function mustBeNotNil(entity, message) {
  if (entity === undefined || entity === null) {
    throw new Error(message || 'Validated entity is null or undefined')
  }
}

function mustBeEnum(entity, enum_) {
  if (!Object.values(enum_).includes(entity)) {
    throw new Error(`Unknown enum value ${entity}`)
  }
}

module.exports = {
  mustBeNotNil,
  mustBeEnum
}
