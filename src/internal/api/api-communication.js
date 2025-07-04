import axios from 'axios'
import { getAccessToken } from '../auth/authProvider'
import { assert } from '../tools'
import appConfig from '../config'

const apiEndpoint = appConfig.apiEndpoint

/**
 * @param {string} endpoint
 * @param {boolean} requireAuth
 * @returns {Promise<any>}
 */
export async function apiGetRequest (endpoint, requireAuth) {
  const currentUrl = apiEndpoint + endpoint
  const headerConfig = {}
  if (requireAuth) {
    const token = getAccessToken()
    headerConfig.headers = { Authorization: `Bearer ${token}` }
  }

  const response = (requireAuth) ? await axios.get(currentUrl, headerConfig) : await axios.get(currentUrl)

  if (response.status !== 200) {
    throw new Error(`HTTP error! status: ${response.status}. ${response.data}`)
  }

  return response.data
}

/**
 * @param {string} endpoint
 * @param {Subject} subject
 * @returns {Promise<void>}
 */
export async function apiPutRequest (endpoint, subject) {
  const currentUrl = apiEndpoint + endpoint
  const token = getAccessToken()

  assert(subject.id !== undefined && subject.id !== null && subject.id !== '', 'Require subject id when making PUT request')

  const response = await axios.put(
    currentUrl,
    subject,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

  if (response.status !== 201) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.data
}

/**
 * @param {string} endpoint
 * @param {Subject} subject
 * @returns {Promise<void>}
 */
export async function apiPostRequest (endpoint, subject) {
  const currentUrl = apiEndpoint + endpoint
  const token = getAccessToken()

  const response = await fetch(
    currentUrl,
    {
      method: 'POST',
      body: JSON.stringify(subject),
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  if (response.status !== 201) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
}

/**
 * @param {string} endpoint
 * @returns {Promise<void>}
 */
export async function apiDeleteRequest (endpoint) {
  const currentUrl = apiEndpoint + endpoint
  const token = getAccessToken()

  const response = await axios.delete(currentUrl, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (response.status !== 200) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
}

/**
 * @param {string} endpoint
 * @param {FormData} formData
 * @param {boolean} expectedJson
 * @returns {Promise<Record<string, any> | void>}
 */
export async function apiPostFormRequest (endpoint, formData, expectedJson = false) {
  const currentUrl = apiEndpoint + endpoint
  const token = getAccessToken()

  const response = await fetch(currentUrl, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (response.status !== 201 && response.status !== 200) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  if (expectedJson) {
    return await response.json()
  }
}
