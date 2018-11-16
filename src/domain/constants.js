const SupportedCurrencies = Object.freeze({
  EUR: 'EUR'
})

const SupportedProviders = Object.freeze({
  LP: 'LP', // La Poste
  MR: 'MR' // Mondial Relay
})

const PackageSizes = Object.freeze({
  SMALL: 'S',
  MEDIUM: 'M',
  LARGE: 'L'
})

const DEFAULT_CURRENCY = SupportedCurrencies.EUR

// Configuration values for rules
// Ideally should be decoupled from code, e. g. stored in DB or configuration files
const MONTHLY_DISCOUNT_CAP_IN_CENTS = 10 * 100
const FREE_L_PACKAGE_THRESHOLD = 3

module.exports = {
  DEFAULT_CURRENCY,
  FREE_L_PACKAGE_THRESHOLD,
  MONTHLY_DISCOUNT_CAP_IN_CENTS,
  PackageSizes,
  SupportedCurrencies,
  SupportedProviders
}
