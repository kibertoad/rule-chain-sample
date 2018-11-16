const MonthlyRuleHelper = require('./internal/MonthlyRuleHelper')
const validationUtils = require('../utils/validation.utils')
const Money = require('../domain/Money')

class MonthlyCapRule {
  /**
   *
   * @param {Money} cap
   */
  constructor(cap) {
    validationUtils.mustBeNotNil(cap)

    this._cap = cap
    this._discountsThisMonth = Money.forDefaultCurrency()
    this._monthlyRuleHelper = new MonthlyRuleHelper()
  }

  /**
   *
   * @param {Transaction} transaction
   * @param {Money} basePrice
   * @param {Money} discountSoFar
   */
  apply(transaction, basePrice, discountSoFar) {
    if (!this._monthlyRuleHelper.isSameMonth(transaction.date)) {
      this._startNewPeriod(transaction.date)
    }

    const remainingDiscountCap = this._cap.subtract(this._discountsThisMonth)
    const cappedDiscount = discountSoFar.isGreaterThan(remainingDiscountCap)
      ? remainingDiscountCap.clone()
      : discountSoFar.clone()

    this._discountsThisMonth = this._discountsThisMonth.add(cappedDiscount)
    return cappedDiscount
  }

  _startNewPeriod(transactionDate) {
    this._monthlyRuleHelper.startNewPeriod(transactionDate)
    this._discountsThisMonth = Money.forDefaultCurrency()
  }
}

module.exports = MonthlyCapRule
