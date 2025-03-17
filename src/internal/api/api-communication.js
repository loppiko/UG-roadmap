import axios from 'axios'

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
