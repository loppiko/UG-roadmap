import React, { useState } from 'react'
import SubjectListComponent from '../../components/private/subject-list/subject-list-component'
import { useSubjects } from '../../internal/api/calls/subject'
import SubjectEdit from '../../components/modals/subject-edit/subject-edit'
import { Button, CircularProgress } from '@mui/material'

/**
 * @returns {JSX.Element}
 */

function SubjectsList () {
  const { subjects, isLoading, refetchSubjects, emptySubject } = useSubjects()
  const [isSubjectEditVisible, setIsSubjectEditVisible] = useState(false)
  const [subjectToEdit, setSubjectToEdit] = useState(null)

  function handleEditExit () {
    setSubjectToEdit(null)
    setIsSubjectEditVisible(false)
  }

  function handleEditAction () {
    setSubjectToEdit(null)
    setIsSubjectEditVisible(false)
    refetchSubjects()
  }

  /**
   * @param {Subject} subject
   */
  function handleEditSubject (subject) {
    setSubjectToEdit(subject)
    setIsSubjectEditVisible(true)
  }

  //   if (error) alert(`Error: ${error}`)

  return (
        <div className="subject-list-container">
            {
                isSubjectEditVisible &&
                subjectToEdit &&
                <SubjectEdit
                    handleEditExit={handleEditExit}
                    subject={subjectToEdit}
                    handleEditAction={handleEditAction}
                />
            }
            <div className="subject-list-container-upper-part">
                <div className="subject-list-container-title">List of subjects</div>
                <div className="subject-list-container-user-logo">Logo</div>
            </div>
            <div className="subject-list-container-box">
                <div className="subject-list-container-box-list-header">
                    <div className="subject-list-container-box-list-header-filter">List Header</div>
                    <div className="subject-list-container-box-list-header-add">
                        <Button
                            onClick={() => handleEditSubject(emptySubject)}
                            variant="contained"
                            color="primary"
                        >
                            Add subject
                        </Button>
                    </div>
                </div>
                {
                    isLoading
                      ? <CircularProgress />
                      : subjects && subjects.map((subject, index) => (
                        <SubjectListComponent
                            onClick={() => handleEditSubject(subject)}
                            subject={subject}
                            subjectIndex={index}
                            refreshSubjects={refetchSubjects}
                            key={`${subject.name}-${index}`}
                        />
                      ))
                }
            </div>
        </div>
  )
}

export default SubjectsList
