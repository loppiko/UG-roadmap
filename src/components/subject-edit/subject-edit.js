import React, { useEffect, useRef, useState } from 'react'
import TabList from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import SubjectEditDescription from './subject-edit-description'
import SubjectEditSkills from './subject-edit-skills'
import SubjectEditOther from './subject-edit-other'
import PropTypes from 'prop-types'
import { apiPutRequest } from '../../internal/api/api-communication'

/**
 * @param {Function} handleEditExit
 * @param {Subject} subject
 * @returns {JSX.Element}
 */

function SubjectEdit ({ handleEditExit, subject }) {
  const subjectEditReference = useRef(null)
  const [activeTab, setActiveTab] = useState(0)
  const [editedSubject, setEditedSubject] = useState(/** @type {Subject} */ subject)

  /**
   * @param {[boolean, Any]} validatedData - [Validation successful?, data]
   * @param {string} key
   */
  const editSubject = (validatedData, key) => {
    const [validated, value] = validatedData

    if (!validated) return

    setEditedSubject(prevSubject => ({
      ...prevSubject,
      [key]: value
    }))
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (subjectEditReference.current && !subjectEditReference.current.contains(event.target)) {
        handleEditExit()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  })

  async function handleSave () {
    try {
      await apiPutRequest(`/semester/${subject.semester}/subject`, editedSubject)
    } catch (error) {
      console.log(error)
      alert(`Failed to alter subject: ${error.message}`)
    }
    console.log(editedSubject)
  }

  return (
        <div className="subject-edit" ref={subjectEditReference}>
            <div className="subject-edit-upper-panel">
                <div className="subject-edit-upper-panel-left-side">
                    <div className="subject-edit-upper-panel-title">{subject.name}</div>
                    <div className="subject-edit-upper-panel-semester">{`Semester ${subject.semester}`}</div>
                </div>
                <div className="subject-edit-upper-panel-right-side">
                    <div className="subject-edit-upper-panel-right-side-save" onClick={handleSave}>Save</div>
                    <div className="subject-edit-upper-panel-right-side-exit" onClick={handleEditExit}>Exit</div>
                </div>
            </div>
            <TabList value={activeTab} onChange={(_, value) => setActiveTab(value)} className="subject-edit-tabs">
                <Tab className="subject-edit-tabs-description" label={'Description'}></Tab>
                <Tab className="subject-edit-tabs-skills" label={'Skills'}></Tab>
                <Tab className="subject-edit-tabs-other" label={'Other'}></Tab>
            </TabList>
            <div className="subject-edit-content">
                {(activeTab === 0) && <SubjectEditDescription subject={subject} editSubject={editSubject}/>}
                {(activeTab === 1) && <SubjectEditSkills subject={subject} editSubject={editSubject} editedSkillArray={editedSubject.skills}/>}
                {(activeTab === 2) && <SubjectEditOther subject={subject} editSubject={editSubject}/>}
            </div>
        </div>
  )
}

SubjectEdit.propTypes = {
  handleEditExit: PropTypes.func.isRequired,
  subject: PropTypes.object.isRequired
}

export default SubjectEdit
