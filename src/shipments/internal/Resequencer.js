const validationUtils = require('../../utils/validation.utils')

// Considering that there are no guarantees regarding transaction order in provided specification
// and implementation being dependent on them being in order, simple Resequencer was implemented (based on EAI pattern)
class Resequencer {
  constructor() {
    this.transactionEntries = []
  }

  addTransaction(transaction, sourceLine) {
    validationUtils.mustBeNotNil(transaction.date, 'Transaction date is mandatory')

    this.transactionEntries.push({
      transaction,
      sourceLine
    })

    // Rather naive optimization that assumes we are going to get out-of-order transaction rarely, hence we can afford
    // ourselves to resort entire array on such cases. If this actually were a hot path, something more optimized
    // like binary search/insert should have been used
    if (!_lastEntriesInSequence(this.transactionEntries)) {
      this.transactionEntries.sort(
        (transactionEntry1, transactionEntry2) =>
          new Date(transactionEntry1.transaction.date) - new Date(transactionEntry2.transaction.date)
      )
    }
  }
}

function _lastEntriesInSequence(transactionsEntries) {
  if (transactionsEntries.length < 2) {
    return true
  }

  const lastTransaction = transactionsEntries[transactionsEntries.length - 1].transaction
  const preLastTransaction = transactionsEntries[transactionsEntries.length - 2].transaction

  return _isDateAfter(lastTransaction.date, preLastTransaction.date)
}

/**
 *
 * @param {Date} date1
 * @param {Date} date2
 * @returns {boolean} true if date1 is after the date2, false otherwise
 * @private
 */
function _isDateAfter(date1, date2) {
  return date1 - date2 > 0
}

module.exports = Resequencer
