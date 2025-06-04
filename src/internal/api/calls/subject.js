import { useCallback, useEffect, useState } from 'react'
import { apiGetRequest, apiPostRequest } from '../api-communication'
import { isAdmin } from '../../auth/authProvider'

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

  function createEmptySubject () {
    if (isAdmin()) return createEmptyAdminSubject()
    return createEmptyUserSubject()
  }

  return {
    /** @type {SubjectView[]} */
    subjects,
    isLoading,
    error,
    refetchSubjects: setSubjectData,
    emptySubject: createEmptySubject()
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

function createEmptyUserSubject () {
  return {
    name: '',
    id: '',
    ECTS: 0,
    semester: 1,
    lectureHours: 0,
    laboratoryHours: 0,
    skills: [],
    description: '',
    language: '',
    link: ''
  }
}

function createEmptyAdminSubject () {
  return {
    ...createEmptyUserSubject(),
    teachers: []
  }
}
