const validationUtils = require('../../utils/validation.utils')
const arrayUtils = require('../../utils/array.utils')
const Money = require('../../domain/Money')

/**
 * @typedef  {Object} Transaction
 *
 * @property {Date} date
 * @property {string} size
 * @property {string} carrierCode
 */

/**
 * @typedef  {Object} Rule
 *
 * @property {function(transaction: Transaction, discount: Money):Money} apply - apply rule to a given transaction
 */

class DiscountCalculator {
  /**
   *
   * @param {Rule[]|Rule}rules
   */
  constructor(rules) {
    validationUtils.mustBeNotNil(rules)
    this._rules = arrayUtils.ensureArray(rules)
  }

  /**
   *
   * @param {Transaction} transaction
   * @param {Money} basePrice
   */
  getDiscount(transaction, basePrice) {
    let discount = Money.forDefaultCurrency()
    for (const rule of this._rules) {
      discount = rule.apply(transaction, basePrice, discount)
    }
    return discount
  }
}

module.exports = DiscountCalculator
