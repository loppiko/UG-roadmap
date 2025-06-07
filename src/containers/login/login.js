import React, { useEffect, useState } from 'react'
import { useAuth } from '../../internal/auth/authProvider'
import { useNavigate } from 'react-router-dom'
import { msalInstance } from '../../internal/msal'
import appConfig from '../../internal/config'

/**
 * @returns {JSX.Element}
 */

const loginRequest = {
  scopes: [appConfig.loginApiRequestScope]
}

function Login () {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { login, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      msalInstance.loginRedirect(loginRequest)
        .then(() => navigate('/subject-list'))
        .catch((error) => {
          if (error.errorCode !== 'interaction_in_progress') {
            setError(error)
            setLoading(false)
          }
        })
    } else navigate('/subject-list')
  }, [login, navigate])

  return (loading) ? <div>Interaction currently in process...</div> : <div>Error: {error.message || 'Unable to initialize or login'}</div>
}

export default Login
