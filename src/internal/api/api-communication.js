import axios from 'axios'
import { getAccessToken } from '../auth/authProvider'
import { assert } from '../shared/tools'

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

  assert(subject.id === undefined || subject.id === null || subject.id === '', 'During POST request subject should not have id')

  const response = await axios.post(
    currentUrl,
    subject,
    {
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
 * @param {string} subjectId
 * @returns {Promise<void>}
 */
export async function apiDeleteRequest (endpoint, subjectId) {
  const currentUrl = apiEndpoint + endpoint
  const token = getAccessToken()

  assert(subjectId !== undefined && subjectId !== '', 'Require subject id when making DELETE request')
  assert(currentUrl[currentUrl.length - 1] !== '/', 'Last url character cannot include \'/\' sign')
  const deleteUrl = currentUrl + `/${subjectId}`

  const response = await axios.delete(
    deleteUrl,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  if (response.status !== 200) {
    throw new Error(`Delete request failed: ${response.status}`)
  }
}
