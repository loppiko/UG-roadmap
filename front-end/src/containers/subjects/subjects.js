import React from "react";
import { motion} from "framer-motion";
import  {useState} from 'react';   

// ---- components ----
import NavBar from "../../components/nav-bar";

function Subjects() {

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

    const dataVariants = {
        hidden: {opacity:0, y:25},
        visible:{opacity:1, y:0},
    }
    
    const openDescripeAndCheck = (isOpen, setIsOpen) => {

        const reduceIsOpen = arrayIsOpen.reduce((_, curr) => {
            if (curr[0] === true) {
                curr[1](!curr[0])
            }
            return [];
        }, [])

        setIsOpen(!isOpen);
    }

    const dataTransition = {duration:0.5, delay:0.25}

    return (
        <div className="subjects-page">
            <NavBar/>
            <div className="subjects-content">
                <div className="subject-sem-name">First Semester</div>
                <div className="subject-frame">
                    <div className="box">
                        <div className="subject-info">
                            <div className="info-box"><span>ECTS</span> 4</div>
                            <div className="info-box"><span>Lecture</span>30h</div>
                            <div className="info-box"><span>Practical</span>30h</div>
                        </div>
                        <div className="subject-box-content">
                            <div className="subject-box">Elementary mathematics</div>
                            <motion.div onClick={() => openDescripeAndCheck(isOpen1, setIsOpen1)} className="skill-box">relations</motion.div>
                            <motion.div onClick={() => openDescripeAndCheck(isOpen1, setIsOpen1)} className="skill-box">analize</motion.div>
                            <motion.div onClick={() => openDescripeAndCheck(isOpen1, setIsOpen1)} className="skill-box">functions</motion.div>
                            <motion.div onClick={() => openDescripeAndCheck(isOpen1, setIsOpen1)} className="skill-box">logic</motion.div>
                        </div>
                    </div>
                    {isOpen1 && 
                    <motion.div 
                        variants={dataVariants}
                        initial="hidden" 
                        animate="visible" 
                        transition={dataTransition} 
                        className="skill-description">
                    <div className="title">Propability1</div>
                        XDLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus ultricies semper. Pellentesque vitae sodales mauris. Nunc at turpis fermentum, ornare dolor at, malesuada massa. Etiam volutpat imperdiet felis, tincidunt pulvinar velit congue sit amet. 
                    </motion.div>}
                </div>
                <div className="subject-frame">
                    <div className="box">
                        <div className="subject-info">
                            <div className="info-box"><span>ECTS</span> 4</div>
                            <div className="info-box"><span>Lecture</span>30h</div>
                            <div className="info-box"><span>Practical</span>30h</div>
                        </div>
                        <div className="subject-box-content">
                            <div className="subject-box">Discrete mathematics</div>
                            <motion.div onClick={() => openDescripeAndCheck(isOpen2, setIsOpen2)} className="skill-box">graph theory</motion.div>
                            <motion.div onClick={() => openDescripeAndCheck(isOpen2, setIsOpen2)} className="skill-box">propability</motion.div>
                            <motion.div onClick={() => openDescripeAndCheck(isOpen2, setIsOpen2)} className="skill-box">arythmeticcs</motion.div>
                        </div>
                    </div>
                    {isOpen2 && <motion.div 
                        variants={dataVariants}
                        initial="hidden" 
                        animate="visible" 
                        transition={dataTransition} 
                        className="skill-description">
                    <div className="title">Propability</div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus ultricies semper. Pellentesque vitae sodales mauris. Nunc at turpis fermentum, ornare dolor at, malesuada massa. Etiam volutpat imperdiet felis, tincidunt pulvinar velit congue sit amet. 
                    </motion.div> }
                </div>
                <div className="subject-frame">
                    <div className="box">
                        <div className="subject-info">
                            <div className="info-box"><span>ECTS</span> 4</div>
                            <div className="info-box"><span>Lecture</span>30h</div>
                            <div className="info-box"><span>Practical</span>30h</div>
                        </div>
                        <div className="subject-box-content">
                            <div className="subject-box">Developer Workshop</div>
                            <motion.div onClick={() => openDescripeAndCheck(isOpen3, setIsOpen3)} className="skill-box">git</motion.div>
                            <motion.div onClick={() => openDescripeAndCheck(isOpen3, setIsOpen3)} className="skill-box">bash</motion.div>
                            <motion.div onClick={() => openDescripeAndCheck(isOpen3, setIsOpen3)} className="skill-box">terminal</motion.div>
                            <motion.div onClick={() => openDescripeAndCheck(isOpen3, setIsOpen3)} className="skill-box">linux</motion.div>
                        </div>
                    </div>
                    {isOpen3 && 
                    <motion.div 
                        variants={dataVariants}
                        initial="hidden" 
                        animate="visible" 
                        transition={dataTransition} 
                        className="skill-description">
                    <div className="title">Propability2</div>
                        XDLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus ultricies semper. Pellentesque vitae sodales mauris. Nunc at turpis fermentum, ornare dolor at, malesuada massa. Etiam volutpat imperdiet felis, tincidunt pulvinar velit congue sit amet. 
                    </motion.div>}
                </div>
                <div className="subject-frame">
                    <div className="box">
                        <div className="subject-info">
                            <div className="info-box"><span>ECTS</span> 4</div>
                            <div className="info-box"><span>Lecture</span>30h</div>
                            <div className="info-box"><span>Practical</span>30h</div>
                        </div>
                        <div className="subject-box-content">
                            <div className="subject-box">Discrete Mathematics</div>
                            <motion.div onClick={() => openDescripeAndCheck(isOpen4, setIsOpen4)} className="skill-box">testing</motion.div>
                            <motion.div onClick={() => openDescripeAndCheck(isOpen4, setIsOpen4)} className="skill-box">python</motion.div>
                        </div>
                    </div>
                    {isOpen4 && 
                    <motion.div 
                        variants={dataVariants}
                        initial="hidden" 
                        animate="visible" 
                        transition={dataTransition} 
                        className="skill-description">
                    <div className="title">Propability2</div>
                        XDLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus ultricies semper. Pellentesque vitae sodales mauris. Nunc at turpis fermentum, ornare dolor at, malesuada massa. Etiam volutpat imperdiet felis, tincidunt pulvinar velit congue sit amet. 
                    </motion.div>}
                </div>
                <div className="subject-next-sem-name">Second Semester</div>
            </div>
        </div>
    );
}

export default Subjects;