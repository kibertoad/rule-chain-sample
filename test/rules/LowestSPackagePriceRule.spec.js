const sinon = require('sinon')
const { assert } = require('chai')
const Money = require('../../src/domain/Money')
const { LowestSPackagePriceRule } = require('../../src/rules')
const { SupportedProviders, PackageSizes } = require('../../src/domain/constants')
const providerPriceSource = require('../../src/prices/internal/provider.price.source')
const { SMALL_LP, SMALL_MR, LARGE_MR } = require('../__test__/fixtures/transaction.fixtures')

const sandbox = sinon.createSandbox()

describe('LowestSPackagePriceRule', () => {
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
          [PackageSizes.LARGE]: Money.forDefaultCurrency(200)
        }
      })
    )
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('happy path', () => {
    const rule = new LowestSPackagePriceRule()

    const discount = rule.apply(SMALL_MR, Money.forDefaultCurrency(150), Money.forDefaultCurrency())

    assert.equal(discount.amountInCents, 50)
  })

  it('does not apply discount if price is already the lowest one', () => {
    const rule = new LowestSPackagePriceRule()

    const discount = rule.apply(SMALL_LP, Money.forDefaultCurrency(100), Money.forDefaultCurrency())

    assert.equal(discount.amountInCents, 0)
  })

  it('does not apply discount for non-small packages', () => {
    const rule = new LowestSPackagePriceRule()

    const discount = rule.apply(LARGE_MR, Money.forDefaultCurrency(200), Money.forDefaultCurrency())

    assert.equal(discount.amountInCents, 0)
  })
})
