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
import EndingPath from "../../media/paths/subjects/ending-path.svg";
import { useParams } from "react-router-dom/dist/umd/react-router-dom.development";
import { Link } from "react-router-dom";

function Subjects() {

    const { semesterId } = useParams();
    // const semesterNumber = parseInt(semesterId.split("-")[1]);

    const [displaySubjectDescription, setIsVisable] = useState(false);
    const handleSubjectOnClick = () => setIsVisable(true);


    // Returning paths
    function returnPath(index, arrayLength) {
        if (index === arrayLength - 1) return
        else if (index % 2 === 0) return <img src = {RightPath} alt="right-path" className="subjects-path-right" />;
        else return <img src = {LeftPath} alt="left-path" className="subjects-path-left"/>;
    }

    // Return lecture and practical components
    const returnLectureComponent = (content) => {
        if (content) return <div className="info-box"><span>Lecture</span>{content}</div>;
        else return
    }

    const returnPracticalComponent = (content) => {
        if (content) return <div className="info-box"><span>Practical</span>{content}</div>;
        else return
    }

    // Animations
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    const [isOpen4, setIsOpen4] = useState(false);

    const arrayIsOpen = [
        [isOpen1, setIsOpen1],
        [isOpen2, setIsOpen2],
        [isOpen3, setIsOpen3],
        [isOpen4, setIsOpen4]
    ]
    
    const openDescripeAndCheck = (isOpen, setIsOpen) => {

        arrayIsOpen.reduce((_, curr) => {
            if (curr[0] === true) {
                curr[1](!curr[0])
            }
            return [];
        }, [])

        setIsOpen(!isOpen);
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
                                    <Link to={`/roadmap-enter/${semesterId}/${subject["subject-name"].split(" ").join("-")}`} className="subject-box" onClick={handleSubjectOnClick}> { subject["subject-name"] }</Link>
                                    {
                                    subject["skills"].map(skill => <motion.div onClick={() => openDescripeAndCheck(isOpen1, setIsOpen1)} className="skill-box">{skill["skill-name"]}</motion.div>
                                    )
                                    }
                                </div>
                            </div>
                            {
                                isOpen1 && <motion.div 
                                    variants={dataVariants}
                                    initial="hidden" 
                                    animate="visible" 
                                    transition={dataTransition} 
                                    className="skill-description">
                                <div className="title">Propability</div>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus ultricies semper. Pellentesque vitae sodales mauris. Nunc at turpis fermentum, ornare dolor at, malesuada massa. Etiam volutpat imperdiet felis, tincidunt pulvinar velit congue sit amet. 
                                </motion.div>
                            } { returnPath(index, database["semesters"][semesterId].length) }
                        </div>
                    )})
                }
                <img src = {EndingPath} alt="ending-path" className="subject-path-ending"/>
                <div className="subject-next-sem-name">Second Semester</div>
            </div>
        </div>
    );
}

export default Subjects;