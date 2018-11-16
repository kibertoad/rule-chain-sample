const fs = require('fs')
const { assert } = require('chai')
const sinon = require('sinon')
const output = require('../../src/output/std-out/std-out.output')
const discountApplier = require('../../src/shipments/shipment.discount.applier')
const writer = require('../../src/output/std-out/internal/std-out.writer')

const sandbox = sinon.createSandbox()

describe('shipment discount e2e tests', () => {
  let writeSpy
  beforeEach(() => {
    writeSpy = sandbox.spy(writer, 'write')
  })

  afterEach(() => {
    sandbox.restore()
  })

  const EXPECTED_OUTPUT = [
    ['2015-02-01 S MR 1.50 0.50'],
    ['2015-02-02 S MR 1.50 0.50'],
    ['2015-02-03 L LP 6.90 -'],
    ['2015-02-05 S LP 1.50 -'],
    ['2015-02-06 S MR 1.50 0.50'],
    ['2015-02-06 L LP 6.90 -'],
    ['2015-02-07 L MR 4.00 -'],
    ['2015-02-08 M MR 3.00 -'],
    ['2015-02-09 L LP 0.00 6.90'],
    ['2015-02-10 L LP 6.90 -'],
    ['2015-02-10 S MR 1.50 0.50'],
    ['2015-02-10 S MR 1.50 0.50'],
    ['2015-02-11 L LP 6.90 -'],
    ['2015-02-12 M MR 3.00 -'],
    ['2015-02-13 M LP 4.90 -'],
    ['2015-02-15 S MR 1.50 0.50'],
    ['2015-02-17 L LP 6.90 -'],
    ['2015-02-17 S MR 1.90 0.10'],
    ['2015-02-24 L LP 6.90 -'],
    ['2015-02-29 CUSPS Ignored'],
    ['2015-03-01 S MR 1.50 0.50']
  ]

  it('main happy path', async () => {
    await applyFromFile('input/input_happy.txt')

    assert.deepEqual(writeSpy.args, EXPECTED_OUTPUT)
  })

  it('handles identifiers in case-insensitive way', async () => {
    await applyFromFile('input/input_lowercase.txt')

    assert.deepEqual(writeSpy.args, EXPECTED_OUTPUT)
  })

  it('ignores whitespace', async () => {
    await applyFromFile('input/input_whitespace.txt')

    assert.deepEqual(writeSpy.args, EXPECTED_OUTPUT)
  })

  it('handles out-of-sequence transactions correctly', async () => {
    await applyFromFile('input/input_out_of_sequence.txt')

    assert.deepEqual(writeSpy.args, EXPECTED_OUTPUT)
  })

  it('handles bad input correctly', async () => {
    await applyFromFile('input/input_bad.txt')

    assert.deepEqual(writeSpy.args, [['corrupt Ignored'], ['wrong input Ignored'], [' Ignored'], ['48589 Ignored']])
  })

  async function applyFromFile(filePath) {
    const transactionStream = fs.createReadStream(filePath)
    await discountApplier.applyDiscounts(transactionStream, output)
  }
})
