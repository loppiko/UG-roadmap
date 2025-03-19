import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, InputAdornment, OutlinedInput, FormControl, FormHelperText } from '@mui/material'

/**
 * @param {Subject} subject
 * @param {Function} editSubject
 * @returns {JSX.Element}
 */

function SubjectEditOther ({ subject, editSubject }) {
  const [laboratoriesHoursError, setLaboratoriesHoursError] = useState('')
  const [lectureHoursError, setLectureHoursError] = useState('')
  const [ectsError, setEctsError] = useState('')

  /**
   * @param {string} value
   * @param {React.Dispatch} setError
   * @returns {[boolean, number | null]} - [is valid?, value]
   */
  const validateNumbers = (value, setError) => {
    if (value.length === 0) {
      setError('Field should not be empty')
      return [false, null]
    }
    if (!/^\d+$/.test(value)) {
      setError('Only numbers are allowed')
      return [false, null]
    }
    if (value[0] === '0' && value.length > 1) {
      setError('No leading 0s are allowed')
      return [false, null]
    }
    if (value.length >= 4) {
      setError('Number should be lower than 1000')
      return [false, null]
    }
    setError('')
    return [true, parseInt(value, 10)]
  }

  return (
      <div className="subject-edit-other">
        <div className="subject-edit-other-left-side">
          <div className="subject-edit-other-lecture">
            <div className="subject-edit-other-lecture-title">Lecture professors:</div>
            <TextField
                variant="outlined"
                defaultValue={(subject.professorLecture) ? subject.professorLecture : ''}
                onChange={(e) => editSubject([true, e.target.value], 'professorLecture')}
            />
          </div>
          <div className="subject-edit-other-lab">
            <div className="subject-edit-other-lecture-title">Laboratories professors:</div>
            <TextField
                variant="outlined"
                defaultValue={(subject.professorLaboratories) ? subject.professorLaboratories : ''}
                onChange={(e) => editSubject([true, e.target.value], 'professorLaboratories')}
            />
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
                    onChange={(e) => editSubject(validateNumbers(e.currentTarget.value, setLectureHoursError), 'lectureHours')}
                    error={!!lectureHoursError}
                />
                <FormHelperText>{lectureHoursError}</FormHelperText>
              </FormControl>
            </div>
            <div className="subject-edit-other-right-up-lab">
              <div className="subject-edit-other-right-up-lab-title">Laboratories hours: </div>
              <FormControl variant="outlined">
                <OutlinedInput
                    error={!!laboratoriesHoursError}
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end">hours</InputAdornment>}
                    defaultValue={subject.laboratoryHours}
                    onChange={(e) => editSubject(validateNumbers(e.currentTarget.value, setLaboratoriesHoursError), 'laboratoriesHours')}
                />
                <FormHelperText>{laboratoriesHoursError}</FormHelperText>
              </FormControl>
            </div>
            <div className="subject-edit-other-right-up-lab">
              <div className="subject-edit-other-right-up-lab-title">ECTS: </div>
              <FormControl variant="outlined">
                <OutlinedInput
                    error={!!ectsError}
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end">points</InputAdornment>}
                    defaultValue={subject.ECTS}
                    onChange={(e) => editSubject(validateNumbers(e.currentTarget.value, setEctsError), 'ECTS')}
                />
                <FormHelperText>{ectsError}</FormHelperText>
              </FormControl>
            </div>
          </div>
          <div className="subject-eidt-other-right-down">
            <div className="subject-edit-other-right-down-languages">
              <div className="subject-edit-other-right-down-languages-title">Languages: </div>
              <TextField
                  variant="outlined"
                  defaultValue={subject.language}
                  onChange={(e) => editSubject([true, e.target.value], 'language')}
              />
            </div>
          </div>
        </div>
      </div>
  )
}

SubjectEditOther.propTypes = {
  subject: PropTypes.object.isRequired,
  editSubject: PropTypes.func.isRequired
}

export default SubjectEditOther
