import { useCallback, useEffect, useState } from 'react'
import { apiGetRequest, apiPostRequest } from '../api-communication'

/**
 * @returns {Promise<{success: boolean, data?: SubjectView[], error?: Error}>}
 */
async function makeRequestToDownloadAllSubjects () {
  try {
    /** @type {Subject[]} */
    const data = await apiGetRequest('semester/subjects', true)
    let lastSemesterNumber = 0

    const processedSubjects = data.map((subject) => {
      const displaySemesterName = lastSemesterNumber !== subject.semester

      if (displaySemesterName) lastSemesterNumber = subject.semester

      return {
        ...subject,
        displaySemesterName
      }
    })

    const sortedSubjects = processedSubjects.sort((a, b) => a.semester - b.semester)

    return { success: true, data: sortedSubjects }
  } catch (error) {
    console.error('Failed to fetch subjects:', error)
    return { success: false, error }
  }
}

/**
 * @param {Subject} subject
 * @param {number} newSemester
 * @returns {Promise<{success: boolean, error?: Error}>}
 */
async function makeRequestToMoveSubject (subject, newSemester) {
  try {
    console.log('makeRequestToMoveSubject')
    await apiPostRequest(`semester/${subject.semester}/subject/${subject.id}/move-to/${newSemester}`, {})
    return { success: true }
  } catch (error) {
    console.error('Failed to move subject:', error)
    return { success: false, error }
  }
}

export function UseSubjects () {
  const [subjects, setSubjects] = useState(/** @type {SubjectView[]} */[])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const setSubjectData = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    const result = await makeRequestToDownloadAllSubjects()

    if (result.success) {
      setSubjects(result.data)
    } else {
      setError(result.error)
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    setSubjectData()
  }, [])

  return {
    /** @type {SubjectView[]} */
    subjects,
    isLoading,
    error,
    refetchSubjects: setSubjectData
  }
}

export function UseMoveSubject () {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const moveSubject = useCallback(async (subject, newSemester) => {
    setIsLoading(true)
    setError(null)

    const result = await makeRequestToMoveSubject(subject, newSemester)

    if (!result.success) {
      setError(result.error)
    }

    setIsLoading(false)
  }, [])

  return {
    moveSubject,
    isLoading,
    error
  }
}
