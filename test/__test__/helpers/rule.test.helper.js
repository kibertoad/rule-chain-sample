const Money = require('../../../src/domain/Money')

const ZERO_MONEY = Money.forDefaultCurrency()
const DEFAULT_BASE_PRICE = Money.forDefaultCurrency(100)

/**
 *
 * @param rule
 * @param transaction
 * @param basePrice
 * @param times
 * @returns {Money} discount for the last transaction processed
 */
function applyRuleToTransaction(rule, transaction, times = 1, basePrice = DEFAULT_BASE_PRICE) {
  let discountSoFar
  for (let i = 0; i < times; i++) {
    discountSoFar = rule.apply(transaction, basePrice, ZERO_MONEY)
  }
  return discountSoFar
}

module.exports = {
  DEFAULT_BASE_PRICE,
  applyRuleToTransaction
}
