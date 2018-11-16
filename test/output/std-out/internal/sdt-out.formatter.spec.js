const { assert } = require('chai')
const Money = require('../../../../src/domain/Money')
const formatter = require('../../../../src/output/std-out/internal/std-out.formatter')

describe('std-out.formatter', () => {
  describe('format', () => {
    it('happy path', () => {
      const formattedString = formatter.format(
        {
          date: new Date('2018-02-01'),
          size: 'S',
          carrierCode: 'LP'
        },
        Money.forDefaultCurrency(99),
        Money.forDefaultCurrency(150)
      )
      assert.equal(formattedString, '2018-02-01 S LP 0.99 1.50')
    })

    it('replaces no discount with -', () => {
      const formattedString = formatter.format(
        {
          date: new Date('2018-02-01'),
          size: 'S',
          carrierCode: 'LP'
        },
        Money.forDefaultCurrency(99),
        Money.forDefaultCurrency(0)
      )
      assert.equal(formattedString, '2018-02-01 S LP 0.99 -')
    })
  })
})
