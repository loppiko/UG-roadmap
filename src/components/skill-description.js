import React, { useState } from 'react'
import { motion } from 'framer-motion'

import ExitArrowIcon from '../media/icons/exit-arrow-icon.svg'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

// 112 - footer size

/**
 * @param {SkillView} skill
 * @param {Function} handleExitArrowOnClick
 * @returns {React.JSX.Element | null}
 */

function SkillDescription ({ skill, handleExitArrowOnClick }) {
  const dataTransition = { duration: 0.5, delay: 0.25 }
  const [currentSkill, setCurrentSkill] = useState(/** @type {SkillView} */ skill)

  const dataVariants = {
    hidden: { opacity: 0, x: 25 },
    visible: { opacity: 1, y: 0 }
  }

  const handleNextSkill = () => {
    const subject = currentSkill.subject

    const currentSkillIndex = currentSkill.subject.skills.findIndex(skill => skill.id === currentSkill.id)

    /** @type {SkillView} */
    const newSkill = (currentSkillIndex < currentSkill.subject.skills.length - 1)
      ? { ...currentSkill.subject.skills[currentSkillIndex + 1], subject }
      : { ...currentSkill.subject.skills[0], subject }

    setCurrentSkill(newSkill)
  }

  return (
        <div className="component-skill-description" style={{ height: `${document.documentElement.scrollHeight - 112}px` }}>
            <motion.div
                variants={dataVariants}
                initial="hidden"
                animate="visible"
                transition={dataTransition}
                className="component-skill-non-transparent">
                <Link onClick={() => handleExitArrowOnClick(false)} alt="exit-arrow" className="component-skill-non-transparent-exit-arrow">
                    <img src={`${ExitArrowIcon}`} alt="exitArrowIcon"></img>
                </Link>
                <div className="component-skill-non-transparent-title">{`${currentSkill.name}`}</div>
                <div className="component-skill-non-transparent-subject-name">{`${currentSkill.subject.name}`}</div>
                <div className="component-skill-non-transparent-description">{`${currentSkill.description}`}</div>
                <motion.div
                    whileHover={{ scale: 1.1 }} onHoverStart={_ => {}}
                    onHoverEnd={_ => {}}
                    className="component-skill-non-transparent-sylabus">
                    <Link className="component-skill-non-transparent-sylabus-link" onClick={handleNextSkill} >Next Skill</Link>
                </motion.div>
            </motion.div>
        </div>
  )
}

SkillDescription.propTypes = {
  skill: PropTypes.object.isRequired,
  handleExitArrowOnClick: PropTypes.func.isRequired
}

export default SkillDescription
