const priceSource = require('./internal/provider.price.source')

/**
 * Resolve base price for a given package size at a given shipment provider
 * @param {SupportedProviders} provider
 * @param {PackageSizes} packageSize
 * @returns {Money} price
 */
function resolveBasePrice(provider, packageSize) {
  const providerBasePriceMap = priceSource.getProviderBasePrices()
  if (!providerBasePriceMap[provider]) {
    throw new Error(`Unsupported provider ${provider}`)
  }

  if (!providerBasePriceMap[provider][packageSize]) {
    throw new Error(`Unsupported package size ${packageSize} for provider ${provider}`)
  }

  return providerBasePriceMap[provider][packageSize]
}

/**
 *
 * @param packageSize
 * @returns {Money} lowest price at any service provider
 */
function resolveLowestPrice(packageSize) {
  // Some kind of memoization or caching might make sense for actual production code with lots of prices and providers
  const providerBasePriceMap = priceSource.getProviderBasePrices()
  const lowestPrice = Object.values(providerBasePriceMap).reduce((lowestPriceSoFar, prices) => {
    const currentPrice = prices[packageSize]
    if (!currentPrice) {
      return lowestPriceSoFar
    }

    // Set as lowest price if first entry or lower than current lowest
    if (lowestPriceSoFar === -1 || currentPrice.isLessThan(lowestPriceSoFar)) {
      return currentPrice
    }

    return lowestPriceSoFar
  }, -1)

  if (lowestPrice === -1) {
    throw new Error(`Unsupported package size ${packageSize}`)
  }
  return lowestPrice
}

module.exports = {
  resolveBasePrice,
  resolveLowestPrice
}
