import React, { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { isTokenExpired } from '../msal'
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

  const login = (token) => {
    localStorage.setItem('access_token', token)
    setUser({ token })
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    setUser(null)
  }

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

export function isAdmin () {
  const accessToken = getAccessToken()
  const decodedToken = jwtDecode(accessToken)
  const roles = decodedToken.roles
  return roles.includes(Roles.ADMIN)
}

export function canAssignTeachers () {
  return isAdmin()
}

export const useAuth = () => useContext(AuthContext)
