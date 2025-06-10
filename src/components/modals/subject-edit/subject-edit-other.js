import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, InputAdornment, OutlinedInput, FormControl, FormHelperText, Button, Select, MenuItem, Alert } from '@mui/material'
import MoveSubjectModal from '../move-subject/moveSubjectModal'
import { AVAILABLE_SEMESTERS } from '../../../internal/types/subject'
import TeacherAssignModal from '../teacher-assign/teacherAssignModal'
import SelectedTeacherBox from '../teacher-assign/selectedTeacherBox'
import { SubjectType } from '../../../internal/types/teacher'
import { canAssignTeachers } from '../../../internal/auth/authProvider'

/**
 * @param {Subject} subject
 * @param {Function} editSubject
 * @param {Function} refreshSubjects
 * @returns {JSX.Element}
 */

function SubjectEditOther ({ subject, editSubject, refreshSubjects }) {
  const [laboratoriesHoursError, setLaboratoriesHoursError] = useState('')
  const [lectureHoursError, setLectureHoursError] = useState('')
  const [ectsError, setEctsError] = useState('')
  const [isMoveSubjectModalOpen, setIsMoveSubjectModalOpen] = useState(false)
  const [currentSemester, setCurrentSemester] = useState(subject.semester)
  const [selectedTeachers, setSelectedTeachers] = useState(subject.teachers)
  const [showAssignTeachersModal, setShowAssignTeachersModal] = useState(false)

  const isNew = subject.id === undefined || subject.id === null || subject.id === ''

  /**
   * @param {string} value
   * @param {React.Dispatch} setError
   * @param {number} maxValue
   * @returns {[boolean, number | null]} - [is valid?, value]
   */
  const validateNumbers = (value, setError, maxValue) => {
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

    const number = parseInt(value, 10)

    if (isNaN(number)) {
      setError('Number is not valid')
      return [false, null]
    } else {
      if (number > maxValue) {
        setError(`Number of ${number} is greater than ${maxValue}`)
        return [false, null]
      }
    }

    setError('')
    return [true, number]
  }

  /** @param {Array[AssignedTeacher]} selectedTeachers */
  const handleAssignTeachers = (selectedTeachers) => {
    editSubject([selectedTeachers.length > 0, selectedTeachers], 'teachers')
    if (selectedTeachers.length > 0) {
      setSelectedTeachers(selectedTeachers)
    }
  }

  const changeSemesterComponent = isNew
    ? (
            <FormControl>
                <Select
                    value={currentSemester}
                    onChange={(e) => {
                      editSubject([true, e.target.value], 'semester')
                      setCurrentSemester(e.target.value)
                    }}
                >
                    {AVAILABLE_SEMESTERS.map(semester => <MenuItem key={`semester-${semester}`} value={semester} >{`Semester ${semester}`}</MenuItem>)}
                </Select>
            </FormControl>)
    : <Button variant="outlined" onClick={() => setIsMoveSubjectModalOpen(true)}>Move subject</Button>

  return (
        <div className="subject-edit-other">
            {isMoveSubjectModalOpen && <MoveSubjectModal subject={subject} onClose={() => setIsMoveSubjectModalOpen(false)} afterMove={() => refreshSubjects()} />}
            {
                canAssignTeachers() &&
                showAssignTeachersModal &&
                <TeacherAssignModal
                    subjectName={subject.name}
                    teachersList={selectedTeachers}
                    onClose={() => setShowAssignTeachersModal(false)}
                    handleAssignTeachers={handleAssignTeachers}
                />
            }
            <div className="subject-edit-other-left-side">
                {canAssignTeachers() && <Alert severity="info" sx={{ marginBottom: '20px' }}>Remember that only assigned teachers can modify subject</Alert>}
                <div className="subject-edit-other-lecture">
                    <SelectedTeacherBox
                        title="Lecture Teachers: "
                        teachers={selectedTeachers.filter(teacher => teacher.subjectType === SubjectType.LECTURE)}
                    />
                </div>
                <div className="subject-edit-other-lab">
                    <SelectedTeacherBox
                        title="Laboratory Teachers: "
                        teachers={selectedTeachers.filter(teacher => teacher.subjectType === SubjectType.LABORATORY)}
                    />
                </div>
                <div className="subject-edit-other-down-section">
                    {changeSemesterComponent}
                    {canAssignTeachers() && (
                        <Button
                            variant="contained"
                            onClick={() => setShowAssignTeachersModal(true)}
                        >
                            Assign Teachers
                        </Button>
                    )}
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
                                onChange={(e) => editSubject(validateNumbers(e.currentTarget.value, setLectureHoursError, 1000), 'lectureHours')}
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
                                onChange={(e) => editSubject(validateNumbers(e.currentTarget.value, setLaboratoriesHoursError, 1000), 'laboratoriesHours')}
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
                                onChange={(e) => editSubject(validateNumbers(e.currentTarget.value, setEctsError, 100), 'ECTS')}
                            />
                            <FormHelperText>{ectsError}</FormHelperText>
                        </FormControl>
                    </div>
                    <div className="subject-edit-other-right-up-lab">
                        <div className="subject-edit-other-right-up-lab-title">Sylabus link</div>
                        <FormControl variant="outlined">
                            <OutlinedInput
                                id="outlined-adornment-weight"
                                defaultValue={subject.link}
                                onChange={(e) => editSubject([true, e.target.value], 'link')}
                            />
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
  editSubject: PropTypes.func.isRequired,
  refreshSubjects: PropTypes.func.isRequired
}

export default SubjectEditOther
