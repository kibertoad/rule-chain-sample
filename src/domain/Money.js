const validationUtils = require('../utils/validation.utils')
const { SupportedCurrencies } = require('./constants')

// Based on Fowler's Money EAA pattern. In real-world situation I would use Dinero.js or currency.js library instead
class Money {
  /**
   *
   * @param {SupportedCurrencies} currency
   * @param {number} [amountInCents=0]
   */
  constructor(currency, amountInCents = 0) {
    validationUtils.mustBeEnum(currency, SupportedCurrencies)

    this.amountInCents = amountInCents
    this.currency = currency
  }

  clone() {
    return new Money(this.currency, this.amountInCents)
  }

  /**
   *
   * @param {Money} otherMoney
   */
  assertSameCurrencyAs(otherMoney) {
    if (otherMoney.currency !== this.currency) {
      throw new Error('Automatic currency conversion is not supported')
    }
  }

  /**
   *
   * @param {Money} moneyDelta
   * @returns {Money}
   */
  add(moneyDelta) {
    this.assertSameCurrencyAs(moneyDelta)
    return new Money(this.currency, this.amountInCents + moneyDelta.amountInCents)
  }

  /**
   *
   * @param {Money} moneyDelta
   * @returns {Money}
   */
  subtract(moneyDelta) {
    this.assertSameCurrencyAs(moneyDelta)
    return new Money(this.currency, this.amountInCents - moneyDelta.amountInCents)
  }

  /**
   *
   * @param {Money} otherMoney
   * @returns {boolean}
   */
  isGreaterThan(otherMoney) {
    this.assertSameCurrencyAs(otherMoney)
    return this.amountInCents > otherMoney.amountInCents
  }

  /**
   *
   * @param {Money} otherMoney
   * @returns {boolean}
   */
  isLessThan(otherMoney) {
    this.assertSameCurrencyAs(otherMoney)
    return this.amountInCents < otherMoney.amountInCents
  }

  /**
   *
   * @returns {string}
   */
  getFormatted() {
    return parseFloat(this.amountInCents / 100).toFixed(2)
  }

  /**
   *
   * @param {number} [amountInCents=0]
   * @returns {Money}
   */
  static forDefaultCurrency(amountInCents = 0) {
    return new Money(SupportedCurrencies.EUR, amountInCents)
  }
}

module.exports = Money
