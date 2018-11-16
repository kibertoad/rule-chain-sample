const { assert } = require('chai')
const { FreeLPackageRule } = require('../../src/rules')
const ruleTestHelper = require('../__test__/helpers/rule.test.helper')

const { DEFAULT_BASE_PRICE } = ruleTestHelper
const { LARGE_LP, MEDIUM_LP, LARGE_MR } = require('../__test__/fixtures/transaction.fixtures')

describe('FreeLPackageRule', () => {
  it('happy path', () => {
    const rule = new FreeLPackageRule(3)

    const discount = ruleTestHelper.applyRuleToTransaction(rule, LARGE_LP, 3)

    assert.equal(discount.amountInCents, DEFAULT_BASE_PRICE.amountInCents)
  })

  it('applies discount correctly across different months', () => {
    const rule = new FreeLPackageRule(3)

    ruleTestHelper.applyRuleToTransaction(rule, LARGE_LP, 3)

    const discountNextMonth = ruleTestHelper.applyRuleToTransaction(
      rule,
      {
        ...LARGE_LP,
        date: new Date('2018-03-04')
      },
      3
    )
    assert.equal(discountNextMonth.amountInCents, DEFAULT_BASE_PRICE.amountInCents)
  })

  it('does not apply discount twice in same month', () => {
    const rule = new FreeLPackageRule(3)

    const discount = ruleTestHelper.applyRuleToTransaction(rule, LARGE_LP, 6)

    assert.equal(discount.amountInCents, 0)
  })

  it('does not apply discount before threshold is reached', () => {
    const rule = new FreeLPackageRule(3)

    const discount = ruleTestHelper.applyRuleToTransaction(rule, LARGE_LP, 2)

    assert.equal(discount.amountInCents, 0)
  })

  it('does not apply discount to non-LP packages', () => {
    const rule = new FreeLPackageRule(3)

    const discount = ruleTestHelper.applyRuleToTransaction(rule, LARGE_MR, 3)

    assert.equal(discount.amountInCents, 0)
  })

  it('does not apply discount to non-large packages', () => {
    const rule = new FreeLPackageRule(3)

    const discount = ruleTestHelper.applyRuleToTransaction(rule, MEDIUM_LP, 3)

    assert.equal(discount.amountInCents, 0)
  })
})
