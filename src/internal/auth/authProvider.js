import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { isTokenExpired, msalInstance } from '../msal'
import { Roles } from './const'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {}
})

/**
 * @param {JSX.Element} children
 * @returns {JSX.Element}
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('access_token')

    if (token && !isTokenExpired(token)) {
      setUser({ token })
    } else {
      localStorage.removeItem('access_token')
      setUser(null)
    }
  }, [])

  const login = useCallback((token) => {
    localStorage.setItem('access_token', token)
    setUser({ token })
  }, [])

  const logout = useCallback(async () => {
    try {
      await msalInstance.logoutRedirect({
        postLogoutRedirectUri: window.location.origin + '/'
      })
    } catch (error) {
      console.error('Error logging out:', error)
    }
    localStorage.removeItem('access_token')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}

/**
 * @returns {string}
 */
export const getAccessToken = () => {
  const token = localStorage.getItem('access_token')

  if (token) {
    return token
  } else {
    throw new Error('User is not authenticated')
  }
}

/**
 * @returns {boolean}
 */
export const isAdmin = () => {
  const accessToken = getAccessToken()
  const decodedToken = jwtDecode(accessToken)
  const roles = decodedToken.roles
  return (roles && roles instanceof Array) ? roles.includes(Roles.ADMIN) : false
}

/**
 * @returns {string}
 */
export const getUserName = () => {
  const accessToken = getAccessToken()
  const decodedToken = jwtDecode(accessToken)
  return decodedToken.given_name || ''
}

export const canAssignTeachers = () => {
  return isAdmin()
}

export const useAuth = () => useContext(AuthContext)
