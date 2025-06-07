import { useEffect, useState } from 'react'
import { apiGetRequest } from '../api-communication'
import { assert } from '../../tools'
import { canAssignTeachers } from '../../auth/authProvider'

/**
 * @returns {{data: Teacher[], isLoading: boolean, error: Error | null}}
 */
export function useTeachers () {
  const [data, setData] = useState(/** @type {Teacher[]} */ [])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  assert(canAssignTeachers(), 'User roles does not allow to use teachers API')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        /** @type {Teacher[]} */
        const data = await apiGetRequest('users', true)
        setData(data)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, isLoading, error }
}
