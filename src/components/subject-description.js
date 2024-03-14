import React from "react";
import {motion} from "framer-motion";
import { useParams } from "react-router-dom/dist/umd/react-router-dom.development";
import { Link } from "react-router-dom";

import ExitArrowIcon from "../media/icons/exit-arrow-icon.svg"


// database
import database from "../main.json";


// 112 - footer size

function SubjectDescription({handleTransparentOnClick}) {
    const {semesterId, subjectName} = useParams();
    const currentSubject = database["semesters"][semesterId].find(subj => subj["subject-name"] === subjectName.split("-").join(" "));

    const dataTransition = {duration:0.5, delay:0.25}

    const dataVariants = {
        hidden: {opacity:0, x:25},
        visible:{opacity:1, y:0},
    }

    return (
        <div className="component-subject-description" style={{height: `${document.documentElement.scrollHeight - 112}px`}}>  
            <div className="component-subject-transparent" onClick={() => handleTransparentOnClick()}></div>
            <motion.div 
            variants={dataVariants}
            initial="hidden"
            animate="visible"
            transition={dataTransition}
            className="component-subject-non-transparent">
                <img src={ExitArrowIcon} alt="exit-arrow" className="component-subject-non-transparent-exit-arrow" onClick={() => handleTransparentOnClick()}/>
                <div className="component-subject-non-transparent-title">{currentSubject["subject-name"]}</div>
                <div className="component-subject-non-transparent-description">{currentSubject["subject-description"]}</div>
                <div className="component-subject-non-transparent-subject-language">
                    <div className="component-subject-non-transparent-subject-description-title">Language of lecture:</div>
                    {currentSubject["language"]}
                </div>
                <div className="component-subject-non-transparent-subject-professor"></div>
                <div className="component-subject-non-transparent-subject-description-title">Lecture leading professor:</div>
                <Link to="https://old.mfi.ug.edu.pl/pracownik/51540/mateusz_miotk" className="component-subject-non-transparent-subject-description-professor-site">{currentSubject["professor-lecture"]}</Link>
                <motion.div 
                whileHover={{ scale: 1.1 }}
                onHoverStart={e => {}}
                onHoverEnd={e => {}}
                className="component-subject-non-transparent-sylabus">
                    <Link to={currentSubject["link"]} className="component-subject-non-transparent-sylabus-link" >Link to sylabus</Link>
                    </motion.div>
            </motion.div>
        </div>
    )
}

export default SubjectDescription;