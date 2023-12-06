import React from "react";
import {motion} from "framer-motion";
import { useParams } from "react-router-dom/dist/umd/react-router-dom.development";

// database
import database from "../main.json";


// 112 - footer size

function SubjectDescription({handleTransparentOnClick}) {
    const {semesterId, subjectName} = useParams();

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
                <div className="component-subject-non-transparent-title">Elementary Mathematics</div>
                <div className="component-subject-non-transparent-description">The subject is focuses on presenting detailed information regarding the covering scope basics, algebra, discrete (elements of logic and set theory, combinatorics and graph theory) and probabilistic methods.</div>
                <div className="component-subject-non-transparent-subject-language">
                    <div className="component-subject-non-transparent-subject-description-title">Language of lecture:</div>
                    Polish
                </div>
                <div className="component-subject-non-transparent-subject-professor"></div>
                    <div className="component-subject-non-transparent-subject-description-title">Leading professor:</div>
                    <a href="https://old.mfi.ug.edu.pl/pracownik/51540/mateusz_miotk" className="component-subject-non-transparent-subject-description-professor-site">Dr. Mateusz Miotk</a>
                <motion.div 
                whileHover={{ scale: 1.1 }}
                onHoverStart={e => {}}
                onHoverEnd={e => {}}
                className="component-subject-non-transparent-sylabus">
                    <a href="https://mfi.ug.edu.pl/sites/mfi.ug.edu.pl/files/_nodes/strona/111793/files/syl-matematyka-dyskretna-2023-1694085765501.pdf" className="component-subject-non-transparent-sylabus-link" >Link to sylabus</a>
                    </motion.div>
            </motion.div>
        </div>
    )
}

export default SubjectDescription;