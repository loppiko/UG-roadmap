import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

// ---- components ----
import NavBar from '../../components/nav-bar'
import SubjectDescription from '../../components/subject-description'
import SkillDescription from '../../components/skill-description'

// paths and icons
import Underline from '../../media/underline.svg'

import StartingPath from '../../media/paths/subjects/starting-path.svg'
import RightPath from '../../media/paths/subjects/right-path.svg'
import LeftPath from '../../media/paths/subjects/left-path.svg'
import EndingRightPath from '../../media/paths/subjects/ending-right-path.svg'
import EndingLeftPath from '../../media/paths/subjects/ending-left-path.svg'

import PhoneRightPath from '../../media/paths/subjects/phone/phone-right-path.svg'
import PhoneLeftPath from '../../media/paths/subjects/phone/phone-left-path.svg'

import SkillPath1 from '../../media/paths/subjects/skill-path-1.svg'
import SkillPath2 from '../../media/paths/subjects/skill-path-2.svg'
import SkillPath3 from '../../media/paths/subjects/skill-path-3.svg'
import SkillPath4 from '../../media/paths/subjects/skill-path-4.svg'
import { apiGetRequest } from '../../internal/api/api-communication'

/**
 * @returns {JSX.Element}
 */

function Subjects () {
  // Display skill Paths
  const displaySkillPaths = true

  const { semesterId } = useParams()

  const [activeSubject, setActiveSubject] = useState(/** @type {Subject | null} */ null)

  const [activeSkill, setActiveSkill] = useState(/** @type {SkillView | null} */null)

  const [listOfSubjects, setListOfSubjects] = useState(/** @type {Subject[]} */[])

  /**
   * @param {string} semesterId
   * @returns {Subject[]}
   */
  async function downloadSemesterSubjects (semesterId) {
    try {
      const data = await apiGetRequest(`semester/${semesterId}`, false)
      setListOfSubjects(data)
    } catch (error) {
      console.error('Failed to fetch subjects:', error)
    }
  }

  // Returning paths
  function returnTurningPath (index, arrayLength) {
    if (index === arrayLength - 1) return null
    else if (index % 2 === 0) return <img src = {RightPath} alt="right-path" className="subjects-path-right" />
    else return <img src = {LeftPath} alt="left-path" className="subjects-path-left"/>
  }

  function returnPhoneTurningPath (index, arrayLength) {
    if (index === arrayLength - 1) return null
    else if (index % 2 === 0) return <img src = {PhoneRightPath} alt="phone-right-path" className="subjects-path-right-phone" />
    else return <img src = {PhoneLeftPath} alt="phone-left-path" className="subjects-path-left-phone"/>
  }

  // Return lecture and practical components
  const returnLectureComponent = (content) => {
    if (content) return <div className="info-box" key={'lecture-' + content}><span>Lecture</span>{content}</div>
  }

  const returnPracticalComponent = (content) => {
    if (content) return <div className="info-box" key={'practical-' + content}><span>Practical</span>{content}</div>
  }

  const returnEndingPath = (numberOfSubjects) => (numberOfSubjects % 2 === 1) ? <img src = {EndingRightPath} alt="ending-path" className="subject-path-ending-right"/> : <img src = {EndingLeftPath} alt="ending-path" className="subject-path-ending-left"/>

  // Resolving Sem-name
  const numberArray = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth']

  /**
   * @param {number} shift
   * @returns {string}
   */
  const semName = (shift = 0) => {
    const index = parseInt(semesterId) + shift - 1
    if (index < numberArray.length) return `${numberArray[index]} semester`
    else return 'Bachelor project'
  }

  /**
   * @param {number} shift
   * @returns {string}
   */
  const newSemPath = (shift = 0) => {
    const index = parseInt(semesterId) + shift
    if (index <= numberArray.length && index > 0) return `/roadmap-enter/semester/${index}`
    else return `/roadmap-enter/semester/${semesterId}`
  }

  /**
   * @param {number} shift
   * @returns {null}
   */
  const handleSemesterChange = (shift = 0) => {
    const index = parseInt(semesterId) + shift
    if (index <= numberArray.length && index > 0) downloadSemesterSubjects(index)
    return null
  }

  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    downloadSemesterSubjects(semesterId)
    const handleResize = () => { setScreenWidth(window.innerWidth) }
    window.addEventListener('resize', handleResize)
    return () => { window.removeEventListener('resize', handleResize) }
  }, [])

  const phoneSkillComponent = screenWidth <= 999

  const dataTransition = { duration: 0.5, delay: 0.25 }

  const dataVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0 }
  }

  return (
        <div className="subjects-page">
            {activeSubject !== null && <SubjectDescription handleTransparentOnClick={() => setActiveSubject(null)} subject={activeSubject} />}
            {phoneSkillComponent && activeSkill && <SkillDescription handleExitArrowOnClick={() => setActiveSkill(null)} skill={activeSkill}/>}
            <div className="subjects-main-introduction">
                <div className="subjects-main-introduction-title">Practical informatics</div>
                <img className="subjects-main-introduction-title-underline" src={Underline} alt="title-underline"/>
                <div className="subjects-main-introduction-description">Roadmap of Practical Informatics faculty in Gdansk University</div>
            </div>
            <NavBar/>
            <div className="subjects-content">
                <Link to={newSemPath(-1)} className="subject-sem-name" onClick={() => handleSemesterChange(-1)} >{ semName(0) }</Link>
                <img src={StartingPath} alt="starting-path" className="subject-path-starting"/>
                {
                    listOfSubjects.map((subject, index) => {
                      return (
                        <div className="subject-frame" key={`subject-frame-${subject.name}-${index}`}>
                            <div className="box">
                                <div className="subject-info">
                                    <div className="info-box"><span>ECTS</span>{subject.ECTS}</div>
                                    { returnLectureComponent(subject.lectureHours) }
                                    { returnPracticalComponent(subject.laboratoryHours) }
                                </div>
                                <div className="subject-box-content">
                                    <Link
                                        className="subject-box"
                                        onClick={ () => setActiveSubject(subject) }>{ subject.name }
                                    </Link>
                                    {
                                    subject.skills.map((skill, skillIndex) => {
                                      /** @type {SkillView} */
                                      const skillView = { ...skill, subject }

                                      return (<Link
                                              key={`skill-box-${index}-${skillIndex}`}
                                              onClick={() => setActiveSkill(skillView)}
                                              className="skill-box">{skill.name}
                                          </Link>)
                                    }
                                    )
                                    }
                                    { displaySkillPaths && <img src={ SkillPath1 } alt="SkillPath1" className="subject-skill-path"/>}
                                    { displaySkillPaths && <img src={ SkillPath2 } alt="SkillPath1" className="subject-skill-path"/>}
                                    { displaySkillPaths && (subject.skills.length > 2) && <img src={ SkillPath3 } alt="SkillPath1" className="subject-skill-path"/>}
                                    { displaySkillPaths && (subject.skills.length > 3) && <img src={ SkillPath4 } alt="SkillPath1" className="subject-skill-path"/>}
                                </div>
                            </div>
                            { subject.skills.map((skill, index) => {
                              return (
                                !phoneSkillComponent && activeSkill && skill.id === activeSkill.id && <motion.div
                                        variants={dataVariants}
                                        initial="hidden"
                                        animate="visible"
                                        transition={dataTransition}
                                        className="skill-description"
                                        key={ 'skill-description-' + skill}
                                        >
                                        <div className="title" key={ `title-${subject.skills[index].name}` }>{ skill.name }</div>
                                            { skill.description }
                                    </motion.div>)
                            })
                            }
                            { returnTurningPath(index, listOfSubjects.length) }
                            { returnPhoneTurningPath(index, listOfSubjects.length) }
                        </div>
                      )
                    })
                }
                { returnEndingPath(listOfSubjects.length) }
                <Link to={newSemPath(1)} className="subject-next-sem-name" onClick={() => handleSemesterChange(1)}>{ semName(1) }</Link>
            </div>
        </div>
  )
}

export default Subjects
