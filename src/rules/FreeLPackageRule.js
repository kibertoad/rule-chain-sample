const MonthlyRuleHelper = require('./internal/MonthlyRuleHelper')
const validationUtils = require('../utils/validation.utils')
const { PackageSizes, SupportedProviders } = require('../domain/constants')

// Third L shipment via LP should be free, but only once a calendar month.
class FreeLPackageRule {
  /**
   *
   * @param {number} shipmentCountThreshold
   */
  constructor(shipmentCountThreshold) {
    validationUtils.mustBeNotNil(shipmentCountThreshold, 'shipmentCountThreshold is mandatory')

    this._lShipmentsCount = 0
    this._hasReceivedDiscount = false
    this._shipmentCountThreshold = shipmentCountThreshold
    this._monthlyRuleHelper = new MonthlyRuleHelper()
  }

  /**
   *
   * @param {Transaction} transaction
   * @param {Money} basePrice
   * @param {Money} discountSoFar
   */
  apply(transaction, basePrice, discountSoFar) {
    if (transaction.size !== PackageSizes.LARGE || transaction.carrierCode !== SupportedProviders.LP) {
      return discountSoFar.clone()
    }

    if (!this._monthlyRuleHelper.isSameMonth(transaction.date)) {
      this._startNewPeriod(transaction.date)
    }
    this._lShipmentsCount++

    // If already received discount this month, no discount
    if (this._hasReceivedDiscount) {
      return discountSoFar.clone()
    }

    // If shipment count threshold reached, apply discount
    if (this._lShipmentsCount >= this._shipmentCountThreshold) {
      this._hasReceivedDiscount = true
      return discountSoFar.add(basePrice.clone())
    }

    return discountSoFar.clone()
  }

  _startNewPeriod(transactionDate) {
    this._monthlyRuleHelper.startNewPeriod(transactionDate)
    this._lShipmentsCount = 0
    this._hasReceivedDiscount = false
  }
}

module.exports = FreeLPackageRule
