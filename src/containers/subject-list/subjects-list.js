import React, { useState } from 'react'
import SubjectListComponent from '../../components/private/subject-list/subject-list-component'
import { UseSubjects } from '../../internal/api/calls/subject'
import SubjectEdit from '../../components/modals/subject-edit/subject-edit'
import { Button, CircularProgress } from '@mui/material'

/**
 * @returns {JSX.Element}
 */

function SubjectsList () {
  const { subjects, isLoading, error, refetchSubjects, emptySubject } = UseSubjects()
  const [editData, setEditData] = useState({ visible: false, subject: null })

  function handleRefresh () {
    setEditData({ visible: false, subject: null })
    refetchSubjects()
  }

  if (error) alert(`Error: ${error}`)

  return (
        <div className="subject-list-container">
            {
                editData.visible &&
                <SubjectEdit
                    handleEditExit={() => setEditData({ visible: false, subject: null }) }
                    subject={editData.subject}
                    refreshSubjects={handleRefresh}
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
                            onClick={() => setEditData({ visible: true, subject: emptySubject })}
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
                            onClick={() => setEditData({ visible: true, subject })}
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
