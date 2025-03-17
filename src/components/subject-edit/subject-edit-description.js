import React from 'react'
import Textarea from '@mui/joy/Textarea'
import PropTypes from 'prop-types'

/**
 * @param {Subject} subject
 * @returns {JSX.Element}
 */

function SubjectEditDescription ({ subject }) {
  return (
      <div className="subject-edit-description">
          <Textarea
              id="outlined-basic"
              variant="outlined"
              defaultValue={subject.description}
              className="subject-edit-component-description-textfield"
              minRows={10}
              maxRows={14}
          />
      </div>
  )
}

SubjectEditDescription.propTypes = {
  subject: PropTypes.object.isRequired
}

export default SubjectEditDescription
