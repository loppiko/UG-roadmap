import React from "react";

// 112 - footer size

function SubjectDescription({handleTransparentOnClick}) {

    return (
        <div className="component-subject-description" style={{height: `${document.documentElement.scrollHeight - 112}px`}}>  
            <div className="component-subject-transparent" onClick={() => handleTransparentOnClick()}></div>
            <div className="component-subject-non-transparent">
                <div className="component-subject-non-transparent-title">Elementary Mathematics</div>
                <div className="component-subject-non-transparent-description">The subject is focuses on presenting detailed information regarding the covering scope basics, algebra, discrete (elements of logic and set theory, combinatorics and graph theory) and probabilistic methods.</div>
                <div className="component-subject-non-transparent-subject-language">
                    <div className="component-subject-non-transparent-subject-description-title">Language of lecture:</div>
                    Polish
                </div>
                <div className="component-subject-non-transparent-subject-professor"></div>
                    <div className="component-subject-non-transparent-subject-description-title">Leading professor:</div>
                    Dr. Mateusz Miotk
                <div className="component-subject-non-transparent-sylabus">Link to sylabus</div>
            </div>
        </div>
    )
}

export default SubjectDescription;