import React from 'react'
import { Box, TextField } from '@mui/material'

/**
 * @param {Subject} subject
 * @returns {JSX.Element}
 */

function SubjectEditDescription (subject) {
  return (
        <Box
            component="form"
            className="subject-edit-component-description"
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-basic" variant="outlined" defaultValue={subject.subjectDescription} />
        </Box>)
}

export default SubjectEditDescription
