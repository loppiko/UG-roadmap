import React from 'react'
import { Button } from '@mui/material'
import PropTypes from 'prop-types'

/**
 * @param {Function} callback
 * @returns {JSX.Element}
 */

function DeleteButton ({ callback }) {
  return (
    <Button variant="outlined" color="error" onClick={callback}>
      Delete
    </Button>
  )
}

DeleteButton.propTypes = {
  callback: PropTypes.func.isRequired
}

export default DeleteButton
