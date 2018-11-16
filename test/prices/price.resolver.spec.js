const { assert } = require('chai')
const sinon = require('sinon')
const Money = require('../../src/domain/Money')
const { SupportedProviders, PackageSizes } = require('../../src/domain/constants')
const providerPriceSource = require('../../src/prices/internal/provider.price.source')
const priceResolver = require('../../src/prices/price.resolver')

const sandbox = sinon.createSandbox()

describe('price.resolver', () => {
  beforeEach(() => {
    sandbox.stub(providerPriceSource, 'getProviderBasePrices').callsFake(() =>
      Object.freeze({
        [SupportedProviders.LP]: {
          [PackageSizes.SMALL]: Money.forDefaultCurrency(100),
          [PackageSizes.MEDIUM]: Money.forDefaultCurrency(200),
          [PackageSizes.LARGE]: Money.forDefaultCurrency(20)
        },

        [SupportedProviders.MR]: {
          [PackageSizes.SMALL]: Money.forDefaultCurrency(150),
          [PackageSizes.MEDIUM]: Money.forDefaultCurrency(175),
          [PackageSizes.LARGE]: Money.forDefaultCurrency(20)
        }
      })
    )
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('resolveLowestPrice', () => {
    it('happy path', () => {
      const lowestPriceSmall = priceResolver.resolveLowestPrice(PackageSizes.SMALL)
      const lowestPriceMedium = priceResolver.resolveLowestPrice(PackageSizes.MEDIUM)
      const lowestPriceLarge = priceResolver.resolveLowestPrice(PackageSizes.LARGE)

      assert.equal(lowestPriceSmall.amountInCents, 100)
      assert.equal(lowestPriceMedium.amountInCents, 175)
      assert.equal(lowestPriceLarge.amountInCents, 20)
    })
  })
})
