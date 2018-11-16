const { assert } = require('chai')
const Money = require('../../src/domain/Money')

describe('Money', () => {
  describe('assertSameCurrencyAs', () => {
    it('happy path', () => {
      const money = Money.forDefaultCurrency(1)
      assert.doesNotThrow(() => {
        money.assertSameCurrencyAs(Money.forDefaultCurrency())
      })
    })

    it('throws an error on different currency', () => {
      const money = Money.forDefaultCurrency(1)
      const anotherMoney = Money.forDefaultCurrency()
      anotherMoney.currency = 'USD'

      assert.throws(() => {
        money.assertSameCurrencyAs(anotherMoney)
      }, /Automatic currency conversion is not supported/)
    })
  })

  describe('getFormatted', () => {
    it('handles amount of exactly one cent correctly', () => {
      const money = Money.forDefaultCurrency(1)
      assert.equal(money.getFormatted(), '0.01')
    })

    it('handles amount of less than one eur correctly', () => {
      const money = Money.forDefaultCurrency(99)
      assert.equal(money.getFormatted(), '0.99')
    })

    it('handles amount of exactly one eur correctly', () => {
      const money = Money.forDefaultCurrency(100)
      assert.equal(money.getFormatted(), '1.00')
    })

    it('rounds up cent fractions that are >= 0.5', () => {
      const money = Money.forDefaultCurrency(0.5)
      assert.equal(money.getFormatted(), '0.01')
    })

    it('rounds down cent fractions that are < 0.5', () => {
      const money = Money.forDefaultCurrency(0.49)
      assert.equal(money.getFormatted(), '0.00')
    })
  })
})
