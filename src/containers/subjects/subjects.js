import React from "react";
import {useState } from "react";
import {motion} from "framer-motion";

// ---- components ----
import NavBar from "../../components/nav-bar";
import SubjectDescription from "../../components/subject-description";

// database
import database from "../../main.json";

// paths and icons
import Underline from "../../media/underline.svg"

import StartingPath from "../../media/paths/subjects/starting-path.svg";
import RightPath from "../../media/paths/subjects/right-path.svg";
import LeftPath from "../../media/paths/subjects/left-path.svg";
import EndingRightPath from "../../media/paths/subjects/ending-right-path.svg";
import EndingLeftPath from "../../media/paths/subjects/ending-left-path.svg";

import PhoneRightPath from "../../media/paths/subjects/phone/phone-right-path.svg"
import PhoneLeftPath from "../../media/paths/subjects/phone/phone-left-path.svg"

import SkillPath1 from "../../media/paths/subjects/skill-path-1.svg"
import SkillPath2 from "../../media/paths/subjects/skill-path-2.svg"
import SkillPath3 from "../../media/paths/subjects/skill-path-3.svg"
import SkillPath4 from "../../media/paths/subjects/skill-path-4.svg"

import { useParams } from "react-router-dom/dist/umd/react-router-dom.development";
import { Link } from "react-router-dom";

function Subjects() {
    // lodash
    const _ = require('lodash');

    // Display skill Paths
    const displaySkillPaths = true;

    const { semesterId } = useParams();
    // const semesterNumber = parseInt(semesterId.split("-")[1]);

    const [displaySubjectDescription, setIsVisable] = useState(false);
    const handleSubjectOnClick = () => setIsVisable(true);


    // Returning paths
    function returnTurningPath(index, arrayLength) {
        if (index === arrayLength - 1) return
        else if (index % 2 === 0) return <img src = {RightPath} alt="right-path" className="subjects-path-right" />;
        else return <img src = {LeftPath} alt="left-path" className="subjects-path-left"/>;
    }

    function returnPhoneTurningPath(index, arrayLength) {
        if (index === arrayLength - 1) return
        else if (index % 2 === 0) return <img src = {PhoneRightPath} alt="phone-right-path" className="subjects-path-right-phone" />;
        else return <img src = {PhoneLeftPath} alt="phone-left-path" className="subjects-path-left-phone"/>;
    }

    // Return lecture and practical components
    const returnLectureComponent = (content) => {
        if (content) return <div className="info-box" key={"lecture-" + content}><span>Lecture</span>{content}</div>;
        else return;
    }

    const returnPracticalComponent = (content) => {
        if (content) return <div className="info-box" key={"practical-" + content}><span>Practical</span>{content}</div>;
        else return;
    }

    const returnEndingPath = (numberOfSubjects) => (numberOfSubjects % 2 === 1) ? <img src = {EndingRightPath} alt="ending-path" className="subject-path-ending-right"/> : <img src = {EndingLeftPath} alt="ending-path" className="subject-path-ending-left"/>;


    // Resolving Sem-name
    const numberArray = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth"];

    const semName = (shift = 0) => {
        const index = parseInt(semesterId.split("-")[1]) + shift - 1;
        if (index < numberArray.length) return `${numberArray[index]} semester`;
        else return `Bachelor project`;
    }

    const newSemPath = (shift = 0) => {
        const index = parseInt(semesterId.split("-")[1]) + shift;
        if (index <= numberArray.length && index > 0) return `/roadmap-enter/semester-${index}`;
        else return `/roadmap-enter/${semesterId}`;
    } 

    // Animations
    const [idVisibleSkill, setIdVisable] = useState(null);

    const skillArray = database["semesters"][semesterId]
        .map((subject) => {
            return subject["skills"].map((skill) => {
                return {
                    "skill": skill
                }
            })
        })
        .flat()
        .map(({skill}, index) => {
            return {
                "id": index,
                skill
            }
        })


    const doesSkillMatchActiveId = (skillArray, idVisibleSkill, skill) => {
        const res = skillArray.find(elem => elem["id"] === idVisibleSkill)
        return (!res) ? false : _.isEqual(res["skill"], skill)
    }
    

    const handleSkillOnClick = (skillArray, activeSkill) => {

        skillArray.forEach((elem) => {
            if (_.isEqual(activeSkill, elem["skill"])) {
              setIdVisable(elem["id"]);
            }
          });
    }

    const dataTransition = {duration:0.5, delay:0.25}

    const dataVariants = {
        hidden: {opacity:0, y:25},
        visible:{opacity:1, y:0},
    }

    return (
        <div className="subjects-page">
            {displaySubjectDescription && <SubjectDescription handleTransparentOnClick={() => setIsVisable(false)}/>}
            <div className="subjects-main-introduction">
                <div className="subjects-main-introduction-title">Practical informatics</div>
                <img className="subjects-main-introduction-title-underline" src={Underline} alt="title-underline"/>
                <div className="subjects-main-introduction-description">Roadmap of Practical Informatics faculty in Gdansk University</div>
            </div>
            <NavBar/>
            <div className="subjects-content">
                <Link to={newSemPath(-1)} className="subject-sem-name">{ semName() }</Link>
                <img src={StartingPath} alt="starting-path" className="subject-path-starting"/>
                {
                    database["semesters"][semesterId].map((subject, index) => {
                        return(
                        <div className="subject-frame" key={ subject["subject-name"] }>
                            <div className="box">
                                <div className="subject-info">
                                    <div className="info-box"><span>ECTS</span>{subject["ECTS"]}</div>
                                    { returnLectureComponent(subject["lecture"]) }
                                    { returnPracticalComponent(subject["laboratory"]) }
                                </div>
                                <div className="subject-box-content">
                                    <Link 
                                        to={`/roadmap-enter/${semesterId}/${subject["subject-name"].split(" ").join("-")}`} 
                                        className="subject-box" 
                                        onClick={ handleSubjectOnClick }>{ subject["subject-name"] }
                                    </Link>
                                    {
                                    subject["skills"].map(skill => 
                                        <motion.div 
                                            key={"skill-box-" + skill["skill-name"]}
                                            onClick={() => handleSkillOnClick(skillArray, skill)} 
                                            className="skill-box">{ skill["skill-name"] }
                                        </motion.div>
                                    )
                                    }
                                    { displaySkillPaths && <img src={ SkillPath1 } alt="SkillPath1" className="subject-skill-path"/>}
                                    { displaySkillPaths && <img src={ SkillPath2 } alt="SkillPath1" className="subject-skill-path"/>}
                                    { displaySkillPaths && (subject["skills"].length > 2) && <img src={ SkillPath3 } alt="SkillPath1" className="subject-skill-path"/>}
                                    { displaySkillPaths && (subject["skills"].length > 3) && <img src={ SkillPath4 } alt="SkillPath1" className="subject-skill-path"/>}
                                </div>
                            </div>
                            { subject["skills"].map(skill => {
                                return (
                                    doesSkillMatchActiveId(skillArray, idVisibleSkill, skill) && <motion.div 
                                        variants={dataVariants}
                                        initial="hidden" 
                                        animate="visible" 
                                        transition={dataTransition} 
                                        className="skill-description"
                                        key={ "skill-description-" + skill}
                                        >
                                        <div className="title" key={ `title-${subject["skills"][skill]}` }>{ skill["skill-name"] }</div>
                                            { skill["description"] }
                                    </motion.div>)
                                }) 
                            } 
                            { returnTurningPath(index, database["semesters"][semesterId].length) }
                            { returnPhoneTurningPath(index, database["semesters"][semesterId].length) }
                        </div>
                    )})
                }
                { returnEndingPath(database["semesters"][semesterId].length) }
                <Link to={newSemPath(1)} className="subject-next-sem-name">{ semName(1) }</Link>
            </div>
        </div>
    );
}

export default Subjects;