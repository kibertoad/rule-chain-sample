const { SupportedProviders, PackageSizes } = require('../../../src/domain/constants')

const TransactionFixtures = Object.freeze({
  SMALL_LP: {
    date: new Date('2018-02-03'),
    size: PackageSizes.SMALL,
    carrierCode: SupportedProviders.LP
  },

  MEDIUM_LP: {
    date: new Date('2018-02-03'),
    size: PackageSizes.MEDIUM,
    carrierCode: SupportedProviders.LP
  },

  LARGE_LP: {
    date: new Date('2018-02-03'),
    size: PackageSizes.LARGE,
    carrierCode: SupportedProviders.LP
  },

  SMALL_MR: {
    date: new Date('2018-02-03'),
    size: PackageSizes.SMALL,
    carrierCode: SupportedProviders.MR
  },

  MEDIUM_MR: {
    date: new Date('2018-02-03'),
    size: PackageSizes.MEDIUM,
    carrierCode: SupportedProviders.MR
  },

  LARGE_MR: {
    date: new Date('2018-02-03'),
    size: PackageSizes.LARGE,
    carrierCode: SupportedProviders.MR
  }
})

module.exports = TransactionFixtures
