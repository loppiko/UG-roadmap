import React from 'react'
import PropTypes from 'prop-types'
import { TextField, InputAdornment, OutlinedInput, FormControl } from '@mui/material'

/**
 * @param {Subject} subject
 * @returns {JSX.Element}
 */
function SubjectEditOther ({ subject }) {
  return (
      <div className="subject-edit-other">
        <div className="subject-edit-other-left-side">
          <div className="subject-edit-other-lecture">
            <div className="subject-edit-other-lecture-title">Lecture professors:</div>
            <TextField
                variant="outlined"
                defaultValue={(subject.professorLecture) ? subject.professorLecture : ''}>
            </TextField>
          </div>
          <div className="subject-edit-other-lab">
            <div className="subject-edit-other-lecture-title">Laboratories professors:</div>
            <TextField
                variant="outlined"
                defaultValue={(subject.professorLaboratories) ? subject.professorLaboratories : ''}>
            </TextField>
          </div>
        </div>
        <div className="subject-edit-other-right-side">
          <div className="subject-edit-other-right-up">
            <div className="subject-edit-other-right-up-lecture">
              <div className="subject-edit-other-right-up-lecture-title">Lecture hours:</div>
              <FormControl variant="outlined">
                <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end">hours</InputAdornment>}
                    defaultValue={subject.lectureHours}
                />
              </FormControl>
            </div>
            <div className="subject-edit-other-right-up-lab">
              <div className="subject-edit-other-right-up-lab-title">Laboratories hours: </div>
              <FormControl variant="outlined">
                <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end">hours</InputAdornment>}
                    defaultValue={subject.laboratoryHours}
                />
              </FormControl>
            </div>
            <div className="subject-edit-other-right-up-lab">
              <div className="subject-edit-other-right-up-lab-title">ECTS: </div>
              <FormControl variant="outlined">
                <OutlinedInput
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end">points</InputAdornment>}
                    defaultValue={subject.ECTS}
                />
              </FormControl>
            </div>
          </div>
          <div className="subject-eidt-other-right-down">
            <div className="subject-edit-other-right-down-languages">
              <div className="subject-edit-other-right-down-languages-title">Languages: </div>
              <TextField
                  variant="outlined"
                  defaultValue={subject.language}>
              </TextField>
            </div>
          </div>
        </div>
      </div>
  )
}

SubjectEditOther.propTypes = {
  subject: PropTypes.object.isRequired
}

export default SubjectEditOther
