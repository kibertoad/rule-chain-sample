const priceResolver = require('../prices/price.resolver')
const { PackageSizes } = require('../domain/constants')

// All S shipments should always match lowest S package price among the providers.
class LowestSPackagePriceRule {
  /**
   *
   * @param {Transaction} transaction
   * @param {Money} basePrice
   * @param {Money} discountSoFar
   */
  apply(transaction, basePrice, discountSoFar) {
    if (transaction.size !== PackageSizes.SMALL) {
      return discountSoFar.clone()
    }

    const lowestPrice = priceResolver.resolveLowestPrice(transaction.size)
    return discountSoFar.add(basePrice.subtract(lowestPrice))
  }
}

module.exports = LowestSPackagePriceRule
