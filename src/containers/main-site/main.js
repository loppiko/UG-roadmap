import React from 'react'
import { motion } from 'framer-motion'

// React Router
import { Outlet, Link } from 'react-router-dom'

// database
import database from '../../main.json'

/**
 * @returns {JSX.Element}
 */

function MainSite () {
  return (
        <div className="content">
            <div className="box">
                <div className="title">
                    <span>{database.main.fieldfOfStudy}</span>
                </div>
                <div className="subject-descrition">
                    <span>{database.main['subject-description']}</span>
                </div>
                <div className="overview">
                    <div className="content-header">Program Overview:</div>
                    <span>{database.main['program-overview']}</span>
                </div>
                <div className="skills">
                    <div className="content-header">Skills:</div>
                    <div className="skill-button-box">
                        {database.main.skills.map(content => <button className="skill-button" key={`main-site-button-${content}`}>{content}</button>
                        )}
                    </div>

                </div>
                <div className="career">
                    <div className="content-header">Career Prospects:</div>
                    <span>{database.main['career-prospects']}</span>
                </div>
                <motion.div
                    className="content-button-box"
                    whileHover={{ scale: 1.1 }}
                    onHoverStart={e => {}}
                    onHoverEnd={e => {}}
                >
                    <Link to="roadmap-enter" className="roadmap-button">Roadmap of the subject</Link>
                </motion.div>
            </div>

            <Outlet />
        </div>
  )
}

export default MainSite
