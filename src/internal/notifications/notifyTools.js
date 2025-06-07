import { assert } from '../tools'

export const Severity = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
}

/**
 * @param {keyof typeof Severity} severity
 * @returns {object}
 */
function createNotificationProps (severity) {
  assert(Object.values(Severity).includes(severity), 'Invalid severity')
  return {
    severity,
    autoHideDuration: 3000
  }
}

export { createNotificationProps }
