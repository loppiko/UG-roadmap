import React from 'react'
import Textarea from '@mui/joy/Textarea'
import PropTypes from 'prop-types'
import addIcon from './../../media/icons/add-icon.svg'

/**
 * @param {Subject} subject
 * @returns {JSX.Element}
 */

function SubjectEditSkills ({ subject }) {
  return (
      <div className="subject-edit-skills">
        {subject.skills.map((skill, index) => (
            <div className="subject-edit-skill-edit" key={`${skill.name}-${index}`}>
              <div className="subject-edit-skill-edit-upper-panel">
                <div className="subject-edit-skill-edit-upper-panel-title">{skill.name}</div>
                <div className="subject-edit-skill-edit-upper-panel-editButton">Edit</div>
              </div>
              <Textarea
                  id="outlined-basic"
                  variant="outlined"
                  maxRows={1}
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
  subject: PropTypes.object.isRequired
}

export default SubjectEditSkills
