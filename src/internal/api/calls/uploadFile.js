import { useState } from 'react'
import { apiPostFormRequest } from '../api-communication'

export function usePdfFileUpload () {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  /**
   * @param {File} file
   * @param {keyof typeof languages} language
   * @returns {Promise<Partial<Subject>>}
   */
  const uploadFile = async (file, language) => {
    setIsLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('language', language)

    const response = await apiPostFormRequest('generateObjectFromPdf', formData, true)
    setIsLoading(false)

    return response
  }

  return { uploadFile, isLoading, error }
}
