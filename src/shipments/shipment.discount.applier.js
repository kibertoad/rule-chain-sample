const readline = require('readline')
const validationUtils = require('../utils/validation.utils')

const { FreeLPackageRule, LowestSPackagePriceRule, MonthlyCapRule } = require('../rules/index')
const priceResolver = require('../prices/price.resolver')
const DiscountCalculator = require('./internal/DiscountCalculator')
const Resequencer = require('./internal/Resequencer')

const Money = require('../domain/Money')
const { MONTHLY_DISCOUNT_CAP_IN_CENTS, FREE_L_PACKAGE_THRESHOLD } = require('../domain/constants')

/**
 *
 * @param {ReadableStream} transactionStream
 * @param {Object} output
 * @returns {Promise<any>}
 */
function applyDiscounts(transactionStream, output) {
  validationUtils.mustBeNotNil(transactionStream, 'readStream is mandatory')
  validationUtils.mustBeNotNil(output, 'output is mandatory')

  const reader = _initLineReader(transactionStream)
  const resequencer = new Resequencer()

  return new Promise((resolve, reject) => {
    reader
      .on('line', chunk => {
        const trimmedChunk = chunk.trim().replace(/  +/g, ' ') // Requirements state separator is whitespace, hence we would better handle arbitrary amount of spaces
        try {
          const [date, size, carrierCode] = trimmedChunk.split(' ')
          const transaction = {
            date: new Date(date),
            // Having case-insensitive identifiers makes them less fragile, and there are no explicit requirements for case-sensitivity
            size: size ? size.toUpperCase() : size,
            carrierCode: carrierCode ? carrierCode.toUpperCase() : carrierCode
          }
          resequencer.addTransaction(transaction, chunk)
        } catch (err) {
          output.writeIgnored(chunk)
        }
      })
      .on('close', () => {
        const discountCalculator = _resolveDiscountCalculator()

        // In real-world use-case we would most likely time-box resequencer and process in chunks, not await for entire stream to finish
        for (const transactionEntry of resequencer.transactionEntries) {
          _processTransactionDiscounts(transactionEntry, discountCalculator, output)
        }
        resolve()
      })
      .on('error', err => {
        reject(err)
      })
  })
}

function _processTransactionDiscounts(transactionEntry, discountCalculator, output) {
  try {
    const { transaction } = transactionEntry
    const basePrice = priceResolver.resolveBasePrice(transaction.carrierCode, transaction.size)
    const discount = discountCalculator.getDiscount(transaction, basePrice)
    const adjustedPrice = basePrice.subtract(discount)

    output.write(transaction, adjustedPrice, discount)
  } catch (err) {
    output.writeIgnored(transactionEntry.sourceLine)
  }
}

// Extension point: if there is ever branching based on which rules apply to which users, this can be extracted and expanded
function _resolveDiscountCalculator() {
  return new DiscountCalculator([
    new LowestSPackagePriceRule(),
    new FreeLPackageRule(FREE_L_PACKAGE_THRESHOLD),
    new MonthlyCapRule(Money.forDefaultCurrency(MONTHLY_DISCOUNT_CAP_IN_CENTS))
  ])
}

function _initLineReader(readStream) {
  return readline.createInterface({
    input: readStream,
    output: () => {},
    console: false
  })
}

module.exports = {
  applyDiscounts
}
