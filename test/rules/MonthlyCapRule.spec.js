const { assert } = require('chai')
const { MonthlyCapRule } = require('../../src/rules')
const { LARGE_LP } = require('../__test__/fixtures/transaction.fixtures')
const Money = require('../../src/domain/Money')

describe('MonthlyCapRule', () => {
  it('happy path', () => {
    const rule = new MonthlyCapRule(Money.forDefaultCurrency(100))

    const discount1 = rule.apply(LARGE_LP, Money.forDefaultCurrency(1000), Money.forDefaultCurrency(200))
    const discount2 = rule.apply(LARGE_LP, Money.forDefaultCurrency(1000), Money.forDefaultCurrency(200))

    assert.equal(discount1.amountInCents, 100)
    assert.equal(discount2.amountInCents, 0)
  })

  it('applies discount correctly across different months', () => {
    const rule = new MonthlyCapRule(Money.forDefaultCurrency(100))

    rule.apply(LARGE_LP, Money.forDefaultCurrency(1000), Money.forDefaultCurrency(200))

    const discountNextMonth = rule.apply(
      {
        ...LARGE_LP,
        date: new Date('2018-03-04')
      },
      Money.forDefaultCurrency(1000),
      Money.forDefaultCurrency(200)
    )

    assert.equal(discountNextMonth.amountInCents, 100)
  })

  it('does not modify discount if threshold is not reached', () => {
    const rule = new MonthlyCapRule(Money.forDefaultCurrency(100))

    const discount = rule.apply(LARGE_LP, Money.forDefaultCurrency(1000), Money.forDefaultCurrency(99))

    assert.equal(discount.amountInCents, 99)
  })

  it('correctly handles discount that is equal to the cap', () => {
    const rule = new MonthlyCapRule(Money.forDefaultCurrency(100))

    const discount = rule.apply(LARGE_LP, Money.forDefaultCurrency(1000), Money.forDefaultCurrency(100))

    assert.equal(discount.amountInCents, 100)
  })
})
