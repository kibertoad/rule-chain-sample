const { assert } = require('chai')
const Resequencer = require('../../../src/shipments/internal/Resequencer')

const DATE_2017_12 = new Date('2017-12-02')
const DATE_2018_01 = new Date('2018-01-02')
const DATE_2018_02 = new Date('2018-02-02')

describe('Resequencer', () => {
  it('correctly inserts new transaction at the end of the array', () => {
    const resequencer = new Resequencer()
    resequencer.addTransaction({
      date: DATE_2017_12
    })
    resequencer.addTransaction({
      date: DATE_2018_01
    })
    resequencer.addTransaction({
      date: DATE_2018_02
    })

    assertDateSequence(resequencer.transactionEntries, [DATE_2017_12, DATE_2018_01, DATE_2018_02])
  })

  it('correctly inserts new transaction in the beginning of the array', () => {
    const resequencer = new Resequencer()
    resequencer.addTransaction({
      date: DATE_2018_01
    })
    resequencer.addTransaction({
      date: DATE_2018_02
    })
    resequencer.addTransaction({
      date: DATE_2017_12
    })

    assertDateSequence(resequencer.transactionEntries, [DATE_2017_12, DATE_2018_01, DATE_2018_02])
  })

  it('correctly inserts new transaction in the middle of the array', () => {
    const resequencer = new Resequencer()
    resequencer.addTransaction({
      date: DATE_2017_12
    })
    resequencer.addTransaction({
      date: DATE_2018_02
    })
    resequencer.addTransaction({
      date: DATE_2018_01
    })

    assertDateSequence(resequencer.transactionEntries, [DATE_2017_12, DATE_2018_01, DATE_2018_02])
  })
})

function assertDateSequence(actualTransactions, dates) {
  const transactions = dates.map(date => ({
    transaction: {
      date
    },
    sourceLine: undefined
  }))

  assert.deepEqual(actualTransactions, transactions)
}
