const validationUtils = require('../../../utils/validation.utils')

/**
 *
 * @param {Transaction} transaction
 * @param {Money} adjustedPrice
 * @param {Money} [discount]
 */
function format(transaction, adjustedPrice, discount) {
  validationUtils.mustBeNotNil(adjustedPrice, 'transaction is mandatory')
  validationUtils.mustBeNotNil(adjustedPrice, 'adjustedPrice is mandatory')

  const discountText = discount && discount.amountInCents > 0 ? discount.getFormatted() : '-'
  const dateText = _toDateString(transaction.date)

  return `${dateText} ${transaction.size} ${transaction.carrierCode} ${adjustedPrice.getFormatted()} ${discountText}`
}

function formatIgnored(inputLine) {
  return `${inputLine} Ignored`
}

function _toDateString(date) {
  return `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(-2)}-${`0${date.getDate()}`.slice(-2)}`
}

module.exports = {
  format,
  formatIgnored
}
