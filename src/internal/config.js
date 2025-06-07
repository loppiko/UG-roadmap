import { assert } from './tools'

/**
 * @typedef {object} AppConfig
 * @property {string} clientId - Azure AD Client ID
 * @property {string} tenantId - Azure AD Tenant ID
 * @property {string} redirectUri - Redirect URI for authentication
 * @property {string} loginApiRequestScope - API scope for login requests
 * @property {string} apiEndpoint - Backend API endpoint URL
 */

/**
 * @type {AppConfig}
 */
const appConfig = {
  clientId: process.env.REACT_APP_CLIENT_ID,
  tenantId: process.env.REACT_APP_TENANT_ID,
  redirectUri: process.env.REACT_APP_REDIRECT_URL,
  loginApiRequestScope: process.env.REACT_APP_LOGIN_API_REQUEST_SCOPE,
  apiEndpoint: process.env.REACT_APP_API_ENDPOINT
}

Object.keys(appConfig).forEach((key) => {
  assert(!!appConfig[key], `Missing required environment variable for config key: ${key}. Value: ${appConfig[key]}`)
})

export default appConfig
