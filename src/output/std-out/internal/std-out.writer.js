/**
 *
 * @param {string} text
 */
function write(text) {
  process.stdout.write(`${text}\n`)
}

module.exports = {
  write
}
