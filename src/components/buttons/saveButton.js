import React from 'react'
import { Button } from '@mui/material'
import PropTypes from 'prop-types'

/**
 * @param {Function} callback
 * @returns {JSX.Element}
 */

function SaveButton ({ callback }) {
  return (
    <Button variant="outlined" color="primary" onClick={callback}>
      Save
    </Button>
  )
}

SaveButton.propTypes = {
  callback: PropTypes.func.isRequired
}

export default SaveButton
