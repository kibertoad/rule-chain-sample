const validationUtils = require('../../utils/validation.utils')
const formatter = require('./internal/std-out.formatter')
const writer = require('./internal/std-out.writer')

/**
 * Output processed transaction line with discount applied (when appropriate)
 * @param {Transaction} transaction
 * @param {Money} adjustedPrice
 * @param {Money} discount
 */
function write(transaction, adjustedPrice, discount) {
  validationUtils.mustBeNotNil(transaction, 'transaction is mandatory')
  validationUtils.mustBeNotNil(adjustedPrice, 'adjustedPrice is mandatory')
  validationUtils.mustBeNotNil(discount, 'discount is mandatory')

  const formattedString = formatter.format(transaction, adjustedPrice, discount)
  writer.write(formattedString)
}

/**
 * Output line that was ignored due to incorrect data in it
 * @param {string} [inputLine]
 */
function writeIgnored(inputLine) {
  const formattedString = formatter.formatIgnored(inputLine)
  writer.write(formattedString)
}

module.exports = {
  write,
  writeIgnored
}
