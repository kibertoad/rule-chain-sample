class MonthlyRuleHelper {
  constructor() {
    this.currentYear = null
    this.currentMonth = null
  }

  /**
   *
   * @param {Date} date
   */
  isSameMonth(date) {
    const transactionMonth = date.getMonth()
    const transactionYear = date.getFullYear()
    return this.currentYear === transactionYear && this.currentMonth === transactionMonth
  }

  /**
   *
   * @param {Date} date
   */
  startNewPeriod(date) {
    this.currentYear = date.getFullYear()
    this.currentMonth = date.getMonth()
  }
}

module.exports = MonthlyRuleHelper
