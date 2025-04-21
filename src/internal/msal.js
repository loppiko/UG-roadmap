import { PublicClientApplication } from '@azure/msal-browser'

const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}/v2.0`,
    redirectUri: process.env.REACT_APP_REDIRECT_URL
  }
}

export const msalInstance = new PublicClientApplication(msalConfig)

export async function initializeMsal () {
  await msalInstance.initialize()
  return msalInstance
}

/**
 * @param {string} token
 * @returns {boolean}
 */
export function isTokenExpired (token) {
  try {
    const payloadBase64 = token.split('.')[1]
    const decodedPayload = JSON.parse(atob(payloadBase64))
    const now = Math.floor(Date.now() / 1000)

    return decodedPayload.exp && decodedPayload.exp < now
  } catch (e) {
    console.warn('Invalid token:', e)
    return true
  }
}
