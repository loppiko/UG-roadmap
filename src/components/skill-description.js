import React from "react";
import {motion} from "framer-motion";
import { useParams } from "react-router-dom/dist/umd/react-router-dom.development";

import ExitArrowIcon from "../media/icons/exit-arrow-icon.svg"
import { Link } from "react-router-dom";


// 112 - footer size

function SkillDescription(skillArray, handleExitArrowOnClick) {
    let {semesterId, subjectName, skillId} = useParams();

    const currentSkill = skillArray.find(elem => elem["skill"]["skill-name"].split(" ").join("-") === skillId && subjectName === elem["subject-name"].split(" ").join("-"))

    
    const dataTransition = {duration:0.5, delay:0.25}

    const dataVariants = {
        hidden: {opacity:0, x:25},
        visible:{opacity:1, y:0},
    }

    return (
        <div className="component-skill-description" style={{height: `${document.documentElement.scrollHeight - 112}px`}}>  
            <motion.div 
            variants={dataVariants}
            initial="hidden"
            animate="visible"
            transition={dataTransition}
            className="component-skill-non-transparent">
                <Link to={`/roadmap-enter/${semesterId}/${subjectName}`} onClick={() => handleExitArrowOnClick(false)} alt="exit-arrow" className="component-skill-non-transparent-exit-arrow">
                    <img src={`${ExitArrowIcon}`} alt="exitArrowIcon"></img> 
                </Link>
                <div className="component-skill-non-transparent-title">{`${currentSkill["skill"]["skill-name"]}`}</div>
                <div className="component-skill-non-transparent-subject-name">{`${currentSkill["subject-name"]}`}</div>
                <div className="component-skill-non-transparent-description">{`${currentSkill["skill"]["description"]}`}</div>
                <motion.div 
                    whileHover={{ scale: 1.1 }}
                    onHoverStart={e => {}}
                    onHoverEnd={e => {}}
                    className="component-skill-non-transparent-sylabus">
                    <div className="component-skill-non-transparent-sylabus-link" >Nothing there now</div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default SkillDescription;