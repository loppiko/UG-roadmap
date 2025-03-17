import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './authProvider'
import PropTypes from 'prop-types'

/**
 * @param {JSX.Element} children
 */

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
}

export default ProtectedRoute
