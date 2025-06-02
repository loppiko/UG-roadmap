/**
 * @param {boolean} statement
 * @param {string} testName
 * @throws {Error} When false
 */
export function assert (statement, testName) {
  if (!statement) {
    throw Error(`Assertion failed - ${testName}`)
  }
}
