const { SupportedProviders, PackageSizes } = require('../../domain/constants')
const Money = require('../../domain/Money')

const ProviderBasePrice = Object.freeze({
  [SupportedProviders.LP]: {
    [PackageSizes.SMALL]: Money.forDefaultCurrency(150),
    [PackageSizes.MEDIUM]: Money.forDefaultCurrency(490),
    [PackageSizes.LARGE]: Money.forDefaultCurrency(690)
  },

  [SupportedProviders.MR]: {
    [PackageSizes.SMALL]: Money.forDefaultCurrency(200),
    [PackageSizes.MEDIUM]: Money.forDefaultCurrency(300),
    [PackageSizes.LARGE]: Money.forDefaultCurrency(400)
  }
})

// In real production system this would typically be a call to database; for the purpose of this exercise this additional
// layer of abstraction was introduced to improve testability of the code
function getProviderBasePrices() {
  return ProviderBasePrice
}

module.exports = {
  getProviderBasePrices
}
