import React, { useState } from 'react'
import Textarea from '@mui/joy/Textarea'
import PropTypes from 'prop-types'
import addIcon from './../../media/icons/add-icon.svg'
import trashIcon from './../../media/icons/trash-icon.svg'
import { FormControl, FormHelperText } from '@mui/material'

/**
 * @param {Subject} subject
 * @param {Function} editSubject
 * @param {Skill[]} editedSkillArray
 * @returns {JSX.Element}
 */

function SubjectEditSkills ({ subject, editSubject, editedSkillArray }) {
  const [skillTitleErrorIds, setSkillTitleErrorIds] = useState(/** @type {number[]} */[])
  const [skillDescriptionErrorIds, setSkillDescriptionErrorIds] = useState(/** @type {number[]} */[])

  /**
   * @param {string} value
   * @param {React.Dispatch} setErrorIds
   * @param {number} skillIndex
   * @param {string} key
   * @returns {[boolean, Skill[] | null]} - [is valid?, value]
   */
  const validateText = (value, setErrorIds, skillIndex, key) => {
    if (value.length === 0) {
      setErrorIds((previousErrorIds) => [...previousErrorIds, skillIndex])
      return [false, null]
    } else {
      setErrorIds((previousErrorIds) => previousErrorIds.filter(id => id !== skillIndex))
      const updatedSkills = [...editedSkillArray]
      updatedSkills[skillIndex] = /** @type {Skill} */{ ...updatedSkills[skillIndex], [key]: value }

      return [true, updatedSkills]
    }
  }

  /**
   * @param {string} skillId
   * @returns {null}
   */
  const handleSkillDelete = (skillId) => {
    if (editedSkillArray.length <= 3) {
      // TODO: write notifications
      alert('Subject cannot have less number of skills than 3.')
      return null
    }

    const updatedSkills = [...editedSkillArray].filter(skill => skill.id !== skillId)
    editSubject([true, updatedSkills], 'skills')
  }

  return (
      <div className="subject-edit-skills">
        {editedSkillArray.map((skill, index) => (
            <div className="subject-edit-skill-edit" key={`${skill.id}`}>
              <div className="subject-edit-skill-edit-upper-panel">
                  <FormControl>
                      <Textarea
                          maxRows={1}
                          variant="plain"
                          error={skillTitleErrorIds.includes(index)}
                          className="subject-edit-skill-edit-upper-panel-title"
                          defaultValue={skill.name}
                          onChange={(e) => editSubject(validateText(e.target.value, setSkillTitleErrorIds, index, 'name'), 'skills')}
                          placeholder="Skill title"
                          spellCheck={false}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                            }
                          }}
                      />
                      <FormHelperText>{(skillTitleErrorIds.includes(index)) ? 'Field should not be empty' : ''}</FormHelperText>
                  </FormControl>
                  <img className="subject-edit-trash-icon" src={trashIcon} alt="trash-icon" onClick={() => handleSkillDelete(skill.id)}></img>
              </div>
              <Textarea
                  id="outlined-basic"
                  variant="outlined"
                  className="subject-edit-skill-edit-description-input"
                  minRows={3}
                  maxRows={5}
                  error={skillDescriptionErrorIds.includes(index)}
                  onChange={(e) => editSubject(validateText(e.target.value, setSkillDescriptionErrorIds, index, 'description'), 'skills')}
                  defaultValue={skill.description}
              />
            </div>
        ))}
        {subject.skills.length < 4 && (<div className="subject-edit-add-box">
            <img className="subject-edit-addButton" src={addIcon} alt="addIcon"/>
        </div>)}
      </div>
  )
}

SubjectEditSkills.propTypes = {
  subject: PropTypes.object.isRequired,
  editSubject: PropTypes.func.isRequired,
  editedSkillArray: PropTypes.array.isRequired
}

export default SubjectEditSkills
