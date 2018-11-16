const fs = require('fs')
const discountApplier = require('../src/shipments/shipment.discount.applier')
const output = require('../src/output/std-out/std-out.output')

async function run() {
  const filePath = process.argv[2]

  const transactionStream = fs.createReadStream(filePath)
  await discountApplier.applyDiscounts(transactionStream, output)
}

run()
