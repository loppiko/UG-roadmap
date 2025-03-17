import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import ExitArrowIcon from '../media/icons/exit-arrow-icon.svg'

// database
import PropTypes from 'prop-types'

// 112 - footer size

/**
 * @param {Function} handleTransparentOnClick
 * @param {Subject} subject
 * @returns {JSX.Element}
 */

function SubjectDescription ({ handleTransparentOnClick, subject }) {
  const dataTransition = { duration: 0.5, delay: 0.25 }

  const dataVariants = {
    hidden: { opacity: 0, x: 25 },
    visible: { opacity: 1, y: 0 }
  }

  return (
        <div className="component-subject-description" style={{ height: `${document.documentElement.scrollHeight - 112}px` }}>
            <div className="component-subject-transparent" onClick={handleTransparentOnClick}></div>
            <motion.div
            variants={dataVariants}
            initial="hidden"
            animate="visible"
            transition={dataTransition}
            className="component-subject-non-transparent">
                <img src={ExitArrowIcon} alt="exit-arrow" className="component-subject-non-transparent-exit-arrow" onClick={() => handleTransparentOnClick()}/>
                <div className="component-subject-non-transparent-title">{subject.name}</div>
                <div className="component-subject-non-transparent-description">{subject.description}</div>
                <div className="component-subject-non-transparent-subject-language">
                    <div className="component-subject-non-transparent-subject-description-title">Language of lecture:</div>
                    {subject.language}
                </div>
                <div className="component-subject-non-transparent-subject-professor"></div>
                <div className="component-subject-non-transparent-subject-description-title">Lecture leading professor:</div>
                <Link to="https://old.mfi.ug.edu.pl/pracownik/51540/mateusz_miotk" className="component-subject-non-transparent-subject-description-professor-site">{subject.professorLecture}</Link>
                <motion.div
                whileHover={{ scale: 1.1 }}
                onHoverStart={_ => {}}
                onHoverEnd={_ => {}}
                className="component-subject-non-transparent-sylabus">
                    <Link to={subject.link} className="component-subject-non-transparent-sylabus-link" >Link to sylabus</Link>
                    </motion.div>
            </motion.div>
        </div>
  )
}

SubjectDescription.propTypes = {
  handleTransparentOnClick: PropTypes.func.isRequired,
  subject: PropTypes.object.isRequired
}

export default SubjectDescription
