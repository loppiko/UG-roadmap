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
import { useParams } from "react-router-dom/dist/umd/react-router-dom.development";
import { Link } from "react-router-dom";

function Subjects() {
    // lodash
    const _ = require('lodash');

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

    // Return lecture and practical components
    const returnLectureComponent = (content) => {
        if (content) return <div className="info-box"><span>Lecture</span>{content}</div>;
        else return;
    }

    const returnPracticalComponent = (content) => {
        if (content) return <div className="info-box"><span>Practical</span>{content}</div>;
        else return;
    }

    const returnEndingPath = (numberOfSubjects) => (numberOfSubjects % 2 === 1) ? <img src = {EndingRightPath} alt="ending-path" className="subject-path-ending-right"/> : <img src = {EndingLeftPath} alt="ending-path" className="subject-path-ending-left"/>;

    // Animations
    const returnSkillBoxes = (isOpen, skillTitle, skillDescription) => {
        return (isOpen && <motion.div 
            variants={dataVariants}
            initial="hidden" 
            animate="visible" 
            transition={dataTransition} 
            className="skill-description">
            <div className="title">{ skillTitle }</div>
                { skillDescription }
        </motion.div>)
    }


    // let skillArray = database["semesters"][semesterId]
    //     .map((subject, subjectIndex) => subject["skills"]
    //         .map(skill => 
    //         Object.assign(
    //             {}, 
    //             {
    //                 "skill-name": skill["skill-name"],
    //                 "subjectIndex": subjectIndex,
    //                 "isOpen": false
    //             }
    //             )
    //         )
    //     )
    //     .flat();

    let skillArray = database["semesters"][semesterId]
        .reduce((acc, curr) => [...acc, ...curr["skills"].map(({name, description}) => {
            return {
                name,
                description,
                "isVisible": false
            }
        })], [])


    // const handleSkillOnClick = (skillToOpen) => skillArray = skillArray.map(skill => (_.isEqual(skillToOpen, skill)) ? Object.assign({}, skill, {"isOpen": true}) : Object.assign({}, skill, {"isOpen": false}));
    const handleSkillOnClick = ({openName, openDescription}) => skillArray = skillArray.map(({name, description, vis}) => _.isEqual({openName, openDescription}, {name, description}) ? {name, description, "isVisible": !vis} : {name, description, "isVisible": false})

    const isSkillBoxActive = (renderedSkill) => skillArray.reduce((acc, {name, description, vis}) => _.isEqual(renderedSkill, {name, description}) ? console.log("super") : console.log("nie-super"), false)

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
                <div className="subject-sem-name">First Semester</div>
                <img src={StartingPath} alt="starting-path" className="subject-path-starting"/>
                {
                    database["semesters"][semesterId].map((subject, index) => {
                        return(
                        <div className="subject-frame">
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
                                            onClick={() => handleSkillOnClick(skill)} 
                                            className="skill-box">{ skill["skill-name"] }
                                        </motion.div>
                                    )
                                    }
                                </div>
                            </div>
                            { subject["skills"].map(skill => returnSkillBoxes(isSkillBoxActive(skill), skill["skill-name"], skill["description"])) } 
                            { returnTurningPath(index, database["semesters"][semesterId].length) }
                        </div>
                    )})
                }
                { returnEndingPath(database["semesters"][semesterId].length) }
                <div className="subject-next-sem-name">Second Semester</div>
            </div>
        </div>
    );
}

export default Subjects;