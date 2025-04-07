import axios from 'axios'
import { getAccessToken } from '../auth/authProvider'

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT

/**
 * @param {string} endpoint
 * @returns {Promise<any>}
 */

export async function apiGetRequest (endpoint) {
  const currentUrl = apiEndpoint + endpoint

  const response = await axios.get(currentUrl)

  if (response.status !== 200) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.data
}

/**
 * @param {string} endpoint
 * @param {Any} data
 * @returns {Promise<void>}
 */
export async function apiPutRequest (endpoint, data) {
  const currentUrl = apiEndpoint + endpoint
  const token = getAccessToken()

  const response = await axios.put(
    currentUrl,
    data,
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
